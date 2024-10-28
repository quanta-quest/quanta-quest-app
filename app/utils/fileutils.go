package utils

import (
	"fmt"
	"os"
	"path/filepath"
	"strings"
)

type FileUtils struct{}

var (
	fileUtilsInstance *FileUtils
)

func GetFileUtils() *FileUtils {
	once.Do(func() {
		fileUtilsInstance = &FileUtils{}
	})
	return fileUtilsInstance
}

func (f *FileUtils) FindFile(root, fileName string) (string, error) {
	var result string
	err := filepath.Walk(root, func(path string, info os.FileInfo, err error) error {
		if err != nil {
			return err
		}
		if !info.IsDir() && strings.EqualFold(info.Name(), fileName) {
			result = path
			return filepath.SkipAll
		}
		return nil
	})
	if err != nil {
		return "", err
	}
	if result == "" {
		return "", fmt.Errorf("file %s not found in %s", fileName, root)
	}
	return result, nil
}

func (f *FileUtils) FindFirstFileByType(root string, fileType string) string {
	var result string

	file_type := fileType
	// if file_type is not start with ., add .
	if !strings.HasPrefix(file_type, ".") {
		file_type = "." + file_type
	}

	err := filepath.Walk(root, func(path string, info os.FileInfo, err error) error {
		if err != nil {
			return err
		}
		// mathc file type
		if info.IsDir() {
			// skip dir
			return nil
		}

		// if info.Name() is file type, return the path
		if strings.EqualFold(filepath.Ext(info.Name()), file_type) {
			result = path
			return filepath.SkipAll
		}

		return nil
	})
	if err != nil {
		return ""
	}
	if result == "" {
		return ""
	}
	return result

}

// delete file or folder
func (f *FileUtils) DeleteFile(root string) bool {
	info, err := os.Stat(root)
	// if root is not exist, return true
	if err != nil {
		if os.IsNotExist(err) {
			return true
		} else {
			return false
		}
	}
	// if root is a file, delete file
	if !info.IsDir() {
		return os.Remove(root) == nil
	} else {
		return os.RemoveAll(root) == nil
	}
}

// just delete folder
func (f *FileUtils) DeleteFolder(root string) bool {
	info, err := os.Stat(root)
	// if root is not exist, return true
	if err != nil {
		if os.IsNotExist(err) {
			return true
		} else {
			return false
		}
	}

	// if root is a file, get dir
	if !info.IsDir() {
		return false
	}

	// delete all files in root dir
	return os.RemoveAll(root) == nil
}
