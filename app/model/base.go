package model

import (
	"time"
)

type BaseModel struct {
	ID        int       `gorm:"column:id;primaryKey" json:"id"`
	CreatedAt time.Time `gorm:"autoCreateTime" json:"createdAt"`
	UpdatedAt time.Time `gorm:"autoUpdateTime" json:"updatedAt"`
}
