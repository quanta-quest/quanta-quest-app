package model

import "time"

const TableNameAppSource = "app_sources"

type AppSource struct {
	BaseModel
	AppKey       string    `gorm:"column:app_key" json:"appKey"`
	ZipFilePath  string    `gorm:"column:zip_file_path;default:''" json:"zipFilePath"`
	LastImportAt time.Time `gorm:"column:last_import_at" json:"lastImportAt"`

	// sync status: 0 - init  1 - processing files 2 - imported 3 - failed 4 - deleting 5 - deleted 6 - removing 7 - removed
	Status int `gorm:"column:status;default:0" json:"status"`
}

func (*AppSource) TableName() string {
	return TableNameAppSource
}
