package service

import (
	"errors"
	"fmt"
	"io"
	"os"
	"quanta-quest-app/app/model"
	"quanta-quest-app/app/utils"
	"strings"
	"sync"

	"github.com/attilabuti/mbox"
	"github.com/mnako/letters"
	"gorm.io/gorm"
)

type GmailService struct{}

var (
	gmailServiceInstance *GmailService
	once                 sync.Once
)

func GetGmailService() *GmailService {
	once.Do(func() {
		gmailServiceInstance = &GmailService{}
	})
	return gmailServiceInstance
}

func (g *GmailService) writeToFile(filename string, content string) error {
	// 创建（如果不存在）或打开（如果存在）文件
	file, err := os.Create(filename)
	if err != nil {
		return err
	}
	defer file.Close()

	// 写入内容
	_, err = file.WriteString(content)
	if err != nil {
		return err
	}

	return nil
}

func (g *GmailService) LoadDocuments(filePath string) bool {

	// find mbox file in folder
	mboxFilePath := utils.GetFileUtils().FindFirstFileByType(filePath, "mbox")
	if mboxFilePath == "" {
		return false
	}

	fmt.Println("mboxFilePath", mboxFilePath)

	file, err := os.Open(mboxFilePath)
	if err != nil {
		fmt.Println("Error opening file:", err)
		return false
	}
	defer file.Close()

	// Create a new mbox reader
	mboxReader := mbox.NewReader(file)

	// Iterate through messages
	for {

		message, err := mboxReader.NextMessage()
		if err == io.EOF {
			break
		}

		if err != nil {
			fmt.Println("Error reading message:", err)
			continue
		}

		content, err := io.ReadAll(message)
		if err != nil {
			fmt.Println("Error reading message content:", err)
			continue
		}

		// fmt.Println(string(content))

		msgContent := string(content)

		r := strings.NewReader(msgContent)

		email, _ := letters.ParseEmail(r)

		// fmt.Println("subject", email.Headers.Subject)
		// fmt.Println("text", email.Text)

		//save mail to app document
		appDocument := &model.AppDocument{
			Title:          email.Headers.Subject,
			Content:        msgContent,
			AppKey:         "gmail",
			Location:       "gmail",
			Path:           "",
			Status:         0,
			SourceId:       string(email.Headers.MessageID),
			DocumentType:   "message",
			AdditionalData: "",
		}

		// check if app document already exists
		var existingAppDocument model.AppDocument
		query_result := utils.NewUtil().Db().Where("app_key = ? AND source_id = ?", appDocument.AppKey, appDocument.SourceId).First(&existingAppDocument)
		if query_result.Error != nil {
			if errors.Is(query_result.Error, gorm.ErrRecordNotFound) {

				if err := utils.NewUtil().Db().Create(appDocument).Error; err != nil {
					fmt.Println("Error saving app document:", err)
					continue
				}
			} else {
				fmt.Println("Error checking app document:", query_result.Error)
				continue
			}
		} else {
			if err := utils.NewUtil().Db().Model(&existingAppDocument).Updates(appDocument).Error; err != nil {
				fmt.Println("Error updating app document:", err)
				continue
			}
		}

	}

	return true

}
