package model

const TableNameAppDocument = "app_documents"

type AppDocument struct {
	BaseModel
	Title          string `gorm:"column:title" json:"title"`
	Content        string `gorm:"column:content" json:"content"`
	AppKey         string `gorm:"column:app_key;index:idx_app_key_source_id,composite:true,priority:1" json:"appKey"`
	Location       string `gorm:"column:location" json:"location"`
	Path           string `gorm:"column:path" json:"path"`
	Status         int    `gorm:"column:status" json:"status"`
	SourceId       string `gorm:"column:source_id;index:idx_app_key_source_id,composite:true,priority:2" json:"sourceId"`
	DocumentType   string `gorm:"column:document_type" json:"documentType"`
	AdditionalData string `gorm:"column:additional_data" json:"additionalData"`
}

func (*AppDocument) TableName() string {
	return TableNameAppDocument
}
