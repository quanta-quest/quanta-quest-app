package controller

import (
	"fmt"
	"quanta-quest-app/app/model"
	"quanta-quest-app/app/service"
	"quanta-quest-app/app/utils"
)

type AppSource struct {
	Base
	appSourceService *service.AppSourceService
}

func NewAppSource() *AppSource {
	return &AppSource{
		appSourceService: service.NewAppSourceService(),
	}
}

func (a *AppSource) GetAppSourceList() Res {
	var list []model.AppSource
	if err := a.db().Find(&list).Error; err != nil {
		a.log(err.Error())
		return a.error("未查询到数据")
	}
	return a.success(list)
}

type ImportAppSourceReq struct {
	AppKey      string `json:"appKey"`
	ZipFilePath string `json:"zipFilePath"`
}

// improt app source file
// - user upload zip file
// - save AppSource record to db
// - parser file
// - save AppDocuemnt to db
// - clear unzip files
func (a *AppSource) ImportAppSource(req ImportAppSourceReq) Res {
	// check appSource
	if req.AppKey == "" {
		return a.error("appKey is required")
	} else if req.ZipFilePath == "" {
		return a.error("zipFilePath is required")
	}

	success, message := a.appSourceService.ConnectAppSource(req.AppKey, req.ZipFilePath)
	if !success {
		return a.error(message)
	}

	fmt.Println("connect app source success")

	//get file path, folder or file path
	fmt.Println("parser app source file", req.ZipFilePath)
	success, filePath := a.appSourceService.ParserAppSourceFile(req.AppKey, req.ZipFilePath)

	if !success {
		return a.error("parser app source file failed")
	}

	fmt.Println("parser app source file success", filePath)

	success = a.appSourceService.LoadDocuments(filePath)
	if !success {
		return a.error("Not found mbox file in zip file")
	}

	return a.success(nil)
}

func (a *AppSource) LoadDocuments(appKey string) Res {

	// get app source by appKey
	appSource := model.AppSource{}
	if err := a.db().Where("app_key = ?", appKey).First(&appSource).Error; err != nil {
		return a.error("app source not found")
	}

	fmt.Println("appSource.ZipFilePath", appSource.ZipFilePath)

	success := a.appSourceService.LoadDocuments(appSource.ZipFilePath)
	if !success {
		return a.error("load documents failed")
	}

	return a.success(nil)
}

func (a *AppSource) GetAppSourceConnectInfo(appKey string) Res {
	appSource := model.AppSource{}
	if err := a.db().Where("app_key = ?", appKey).First(&appSource).Error; err != nil {
		return a.error("app source not found")
	}

	return a.success(appSource)
}

func (a *AppSource) DeleteAppSource(appKey string) Res {
	// delete app documents
	err := a.db().Exec("DELETE FROM app_documents WHERE app_key = ?", appKey).Error
	if err != nil {
		return a.error("delete app documents failed")
	}

	// get app source by app key
	appSource := model.AppSource{}
	if err := a.db().Where("app_key = ?", appKey).First(&appSource).Error; err != nil {
		return a.error("app source not found")
	}

	// delete app source file
	path := utils.NewUtil().GetAppSourcePath(appKey)
	utils.GetFileUtils().DeleteFile(path)

	// delete appSource
	if err := a.db().Delete(&appSource).Error; err != nil {
		return a.error("delete app source failed")
	}

	return a.success(nil)
}

type GetAppDocumentsReq struct {
	AppKey   string `json:"appKey"`
	Page     int    `json:"page"`
	PageSize int    `json:"pageSize"`
	Search   string `json:"search"`
}

func (a *AppSource) GetAppDocuments(req GetAppDocumentsReq) Res {
	var documents []model.AppDocument
	var total int64

	query := a.db().Model(&model.AppDocument{})

	if req.AppKey != "" && req.Search != "" {
		query = query.Where("app_key = ? AND title LIKE ?", req.AppKey, "%"+req.Search+"%")
	} else if req.AppKey != "" {
		query = query.Where("app_key = ?", req.AppKey)
	} else if req.Search != "" {
		query = query.Where("title LIKE ?", "%"+req.Search+"%")
	}

	// 获取总数
	if err := query.Count(&total).Error; err != nil {
		return a.error("count documents failed")
	}

	if err := query.Offset((req.Page - 1) * req.PageSize).
		Limit(req.PageSize).
		Find(&documents).Error; err != nil {
		return a.error("get documents failed")
	}

	fmt.Println("documents", documents[0].SourceId)

	return a.success(map[string]interface{}{
		"total":    total,
		"items":    documents,
		"page":     req.Page,
		"pageSize": req.PageSize,
	})
}
