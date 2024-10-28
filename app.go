package main

import (
	"context"
	"fmt"
	"os"

	"strings"

	"github.com/wailsapp/wails/v2/pkg/runtime"
)

// App struct
type App struct {
	ctx context.Context
}

// NewApp creates a new App application struct
func NewApp() *App {
	return &App{}
}

// startup is called at application startup
func (a *App) startup(ctx context.Context) {
	// Perform your setup here
	a.ctx = ctx
}

// domReady is called after front-end resources have been loaded
func (a App) domReady(ctx context.Context) {
	// Add your action here
}

// beforeClose is called when the application is about to quit,
// either by clicking the window close button or calling runtime.Quit.
// Returning true will cause the application to continue, false will continue shutdown as normal.
func (a *App) beforeClose(ctx context.Context) (prevent bool) {
	return false
}

// shutdown is called at application termination
func (a *App) shutdown(ctx context.Context) {
	// Perform your teardown here
}

// Greet returns a greeting for the given name
func (a *App) Greet(name string) string {
	println("start to greet", name)
	return fmt.Sprintf("Hello %s, It's show time!", name)
}

// Open File Dialog
func (a *App) OpenFileDialog() (string, error) {
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

func (a *App) ReadFile(filepath string) (string, error) {
	content, err := os.ReadFile(filepath)
	if err != nil {
		return "", err
	}
	return string(content), nil
}

// SaveFile 保存文件
func (a *App) SaveFile(content string) (string, error) {
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
