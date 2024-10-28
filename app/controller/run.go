package controller

import (
	"context"
	"embed"
	"log"
	"quanta-quest-app/app/model"

	"github.com/wailsapp/wails/v2"
	"github.com/wailsapp/wails/v2/pkg/logger"
	"github.com/wailsapp/wails/v2/pkg/options"
	"github.com/wailsapp/wails/v2/pkg/options/assetserver"
	"github.com/wailsapp/wails/v2/pkg/options/mac"
	"github.com/wailsapp/wails/v2/pkg/options/windows"
)

func domReady(ctx context.Context) {
	// Add your action here
}

func beforeClose(ctx context.Context) (prevent bool) {
	return false
}

func shutdown(ctx context.Context) {
	// Perform your teardown here
}

func WailsRun(assets embed.FS, port int, icon []byte) {
	// Create an instance of the app structure
	// app := NewApp()
	system := NewSystem()
	server := NewServer()
	file := NewFileController()
	appsource := NewAppSource()
	appdocument := NewAppDocument()

	// Create application with options
	err := wails.Run(&options.App{
		Title:             "quanta-quest-app",
		Width:             1024,
		Height:            768,
		MinWidth:          1024,
		MinHeight:         768,
		MaxWidth:          1280,
		MaxHeight:         800,
		DisableResize:     false,
		Fullscreen:        false,
		Frameless:         false,
		StartHidden:       false,
		HideWindowOnClose: false,
		BackgroundColour:  &options.RGBA{R: 255, G: 255, B: 255, A: 255},
		AssetServer: &assetserver.Options{
			Assets: assets,
		},
		Menu:               nil,
		Logger:             nil,
		LogLevel:           logger.DEBUG,
		LogLevelProduction: logger.ERROR,
		OnStartup: func(ctx context.Context) {
			//设置 context 对象
			system.setCtx(ctx)
			file.setCtx(ctx)
			appsource.setCtx(ctx)
			appdocument.setCtx(ctx)
			//启动自定义服务，初始化数据表
			server.start(port).log("程序已启动").schema(&model.AppSource{}, &model.AppDocument{})
		},
		OnDomReady:       domReady,
		OnBeforeClose:    beforeClose,
		OnShutdown:       shutdown,
		WindowStartState: options.Normal,
		Bind: []interface{}{
			system,
			server,
			file,
			appsource,
			appdocument,
		},
		// Windows platform specific options
		Windows: &windows.Options{
			WebviewIsTransparent: false,
			WindowIsTranslucent:  false,
			DisableWindowIcon:    false,
			// DisableFramelessWindowDecorations: false,
			WebviewUserDataPath: "",
			ZoomFactor:          1.0,
		},
		// Mac platform specific options
		Mac: &mac.Options{
			TitleBar: &mac.TitleBar{
				TitlebarAppearsTransparent: false,
				HideTitle:                  false,
				HideTitleBar:               false,
				FullSizeContent:            false,
				UseToolbar:                 false,
				HideToolbarSeparator:       false,
			},
			Appearance:           mac.NSAppearanceNameDarkAqua,
			WebviewIsTransparent: true,
			WindowIsTranslucent:  true,
			About: &mac.AboutInfo{
				Title:   "quanta-quest-app",
				Message: "",
				Icon:    icon,
			},
		},
	})

	if err != nil {
		log.Fatal(err)
	}

}
