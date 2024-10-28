package utils

import (
	"archive/zip"
	"io"
	"os"
	"path/filepath"
	"strings"
)

type ZipUtils struct{}

func NewZipUtils() *ZipUtils {
	return &ZipUtils{}
}

func (u *ZipUtils) UnzipFile(zipPath string) (bool, string, string) {
	destDir := filepath.Dir(zipPath)

	baseName := strings.TrimSuffix(filepath.Base(zipPath), filepath.Ext(zipPath))
	unzipFolderPath := filepath.Join(destDir, baseName)

	reader, err := zip.OpenReader(zipPath)
	if err != nil {
		return false, "", "Open zip file failed"
	}
	defer reader.Close()

	for _, file := range reader.File {

		filePath := filepath.Join(unzipFolderPath, file.Name)
		if file.FileInfo().IsDir() {
			os.MkdirAll(filePath, os.ModePerm)
			continue
		}

		if err := os.MkdirAll(filepath.Dir(filePath), os.ModePerm); err != nil {
			return false, "", "Create directory failed"
		}

		destFile, err := os.OpenFile(filePath, os.O_WRONLY|os.O_CREATE|os.O_TRUNC, file.Mode())
		if err != nil {
			return false, "", "Create file failed"
		}
		defer destFile.Close()

		srcFile, err := file.Open()
		if err != nil {
			return false, "", "Open file failed"
		}
		defer srcFile.Close()

		if _, err := io.Copy(destFile, srcFile); err != nil {
			return false, "", "Copy file failed"
		}
	}

	return true, unzipFolderPath, ""
}
