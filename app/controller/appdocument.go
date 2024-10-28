package controller

import "quanta-quest-app/app/service"

type AppDocumentController struct {
	Base
	appDocumentService *service.AppDocumentService
}

func NewAppDocument() *AppDocumentController {
	return &AppDocumentController{
		appDocumentService: service.NewAppDocumentService(),
	}
}

func (a *AppDocumentController) DeleteAppDocument(id int) Res {
	if err := a.appDocumentService.DeleteAppDocument(id); err != nil {
		return a.error(err.Error())
	}

	return a.success(nil)
}
