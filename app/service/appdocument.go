package service

import (
	"quanta-quest-app/app/model"
	"quanta-quest-app/app/utils"
)

type AppDocumentService struct{}

func NewAppDocumentService() *AppDocumentService {
	return &AppDocumentService{}
}

func (a *AppDocumentService) DeleteAppDocument(id int) error {

	if err := utils.NewUtil().Db().Where("id = ?", id).Delete(&model.AppDocument{}).Error; err != nil {
		return err
	}

	return nil
}
