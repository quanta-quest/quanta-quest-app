package controller

import (
	"fmt"
	"os"
	"path/filepath"
	"strings"

	"github.com/wailsapp/wails/v2/pkg/runtime"
)

// file 系统API
type FileController struct {
	Base
}

func NewFileController() *FileController {
	return &FileController{}
}

// Greet returns a greeting for the given name
func (a *FileController) Greet(name string) string {
	println("start to greet", name)
	return fmt.Sprintf("Hello %s, It's show time!", name)
}

func (a *FileController) ReceiveFile(path string, fileName string, data []byte) Res {
	// Specify the directory where you want to save the file
	// apps/appKey/imports
	appPath := a.getAppPath()
	if path == "" {
		path = "uploads"
	}
	saveDir := filepath.Join(appPath, path)

	// Create the directory if it doesn't exist
	if err := os.MkdirAll(saveDir, os.ModePerm); err != nil {
		// fmt.Sprintf("failed to create directory: %w", err)
		return a.error("failed to create directory")
	}

	// Create the full file path
	filePath := filepath.Join(saveDir, fileName)

	// Write the file
	if err := os.WriteFile(filePath, data, 0644); err != nil {
		// fmt.Sprintf("failed to write file: %w", err)
		return a.error("Save file failed")
	}

	fmt.Printf("File saved: %s\n", filePath)

	return a.success(filePath)
}

// Open File Dialog
func (a *FileController) OpenFileDialog() (string, error) {
	// 打开文件对话框
	file, err := runtime.OpenFileDialog(a.ctx, runtime.OpenDialogOptions{
		Title: "选择文件",
		Filters: []runtime.FileFilter{
			{
				DisplayName: "所有文件",
				Pattern:     "*.*",
			},
			{
				DisplayName: "Excel文件",
				Pattern:     "*.xlsx;*.xls",
			},
			{
				DisplayName: "文本文件",
				Pattern:     "*.txt",
			},
		},
	})

	println("file", file)

	if err != nil {
		return "", err
	}

	return file, nil
}

func (a *FileController) ReadFile(filepath string) (string, error) {
	content, err := os.ReadFile(filepath)
	if err != nil {
		return "", err
	}
	return string(content), nil
}

// SaveFile 保存文件
func (a *FileController) SaveFile(content string) (string, error) {
	// 打开保存文件对话框
	file, err := runtime.SaveFileDialog(a.ctx, runtime.SaveDialogOptions{
		Title: "保存文件",
		Filters: []runtime.FileFilter{
			{
				DisplayName: "文本文件 (*.txt)",
				Pattern:     "*.txt",
			},
		},
	})

	if err != nil {
		return "", err
	}

	// 确保文件扩展名正确
	if !strings.HasSuffix(file, ".txt") {
		file += ".txt"
	}

	// 写入文件
	err = os.WriteFile(file, []byte(content), 0644)
	if err != nil {
		return "", err
	}

	return file, nil
}
