package service

import (
	"fmt"
	"path/filepath"
	"quanta-quest-app/app/model"
	"quanta-quest-app/app/utils"
	"time"
)

type AppSourceService struct{}

func NewAppSourceService() *AppSourceService {
	return &AppSourceService{}
}

// connect App Source
func (a *AppSourceService) ConnectAppSource(appKey string, filePath string) (bool, string) {
	// check is exist
	var existAppSource model.AppSource
	// if record is exist, update, else create
	if err := utils.NewUtil().Db().Where("app_key = ?", appKey).First(&existAppSource).Error; err == nil {
		// update
		if existAppSource.ZipFilePath != filePath {
			// delete old file
			utils.GetFileUtils().DeleteFile(existAppSource.ZipFilePath)

			existAppSource.ZipFilePath = filePath
			existAppSource.LastImportAt = time.Now()
		}
		existAppSource.Status = 0

		//save
		if err := utils.NewUtil().Db().Save(&existAppSource).Error; err != nil {
			return false, "Save failed"
		}
	} else {
		appSource := &model.AppSource{
			AppKey:       appKey,
			ZipFilePath:  filePath,
			LastImportAt: time.Now(),
			Status:       0,
		}

		if err := utils.NewUtil().Db().Create(appSource).Error; err != nil {
			return false, "Create failed"
		}
	}

	return true, ""
}

// parser app source file
// if file type is zip, unzip it and return the file path
// if file type is not zip, return the file path
func (a *AppSourceService) ParserAppSourceFile(appKey string, filePath string) (bool, string) {

	if filepath.Ext(filePath) == ".zip" {
		// unzip
		success, unzipFilePath, _ := utils.NewZipUtils().UnzipFile(filePath)
		fmt.Println("unzip file", unzipFilePath)
		if !success {
			return false, filePath
		}

		return true, unzipFilePath
	} else {
		return true, filePath
	}

}

func (a *AppSourceService) LoadDocuments(filePath string) bool {

	success := GetGmailService().LoadDocuments(filePath)
	if !success {
		return false
	}

	fmt.Println("load documents success")

	//clear unzip files
	utils.GetFileUtils().DeleteFolder(filePath)

	return true
}
