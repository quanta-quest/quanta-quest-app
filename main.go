package main

import (
	"embed"
	"quanta-quest-app/app/controller"
)

//go:embed all:frontend/dist
var assets embed.FS

//go:embed build/appicon.png
var icon []byte

func main() {

	controller.WailsRun(assets, 10088, icon)

	// Create an instance of the app structure
	// app := NewApp()

	// // Create application with options
	// err := wails.Run(&options.App{
	// 	Title:             "quanta-quest-app",
	// 	Width:             1024,
	// 	Height:            768,
	// 	MinWidth:          1024,
	// 	MinHeight:         768,
	// 	MaxWidth:          1280,
	// 	MaxHeight:         800,
	// 	DisableResize:     false,
	// 	Fullscreen:        false,
	// 	Frameless:         false,
	// 	StartHidden:       false,
	// 	HideWindowOnClose: false,
	// 	BackgroundColour:  &options.RGBA{R: 255, G: 255, B: 255, A: 255},
	// 	AssetServer: &assetserver.Options{
	// 		Assets: assets,
	// 	},
	// 	Menu:               nil,
	// 	Logger:             nil,
	// 	LogLevel:           logger.DEBUG,
	// 	LogLevelProduction: logger.ERROR,
	// 	OnStartup:          app.startup,
	// 	OnDomReady:         app.domReady,
	// 	OnBeforeClose:      app.beforeClose,
	// 	OnShutdown:         app.shutdown,
	// 	WindowStartState:   options.Normal,
	// 	Bind: []interface{}{
	// 		app,
	// 	},
	// 	// Windows platform specific options
	// 	Windows: &windows.Options{
	// 		WebviewIsTransparent: false,
	// 		WindowIsTranslucent:  false,
	// 		DisableWindowIcon:    false,
	// 		// DisableFramelessWindowDecorations: false,
	// 		WebviewUserDataPath: "",
	// 		ZoomFactor:          1.0,
	// 	},
	// 	// Mac platform specific options
	// 	Mac: &mac.Options{
	// 		TitleBar: &mac.TitleBar{
	// 			TitlebarAppearsTransparent: false,
	// 			HideTitle:                  false,
	// 			HideTitleBar:               false,
	// 			FullSizeContent:            false,
	// 			UseToolbar:                 false,
	// 			HideToolbarSeparator:       false,
	// 		},
	// 		Appearance:           mac.NSAppearanceNameDarkAqua,
	// 		WebviewIsTransparent: true,
	// 		WindowIsTranslucent:  true,
	// 		About: &mac.AboutInfo{
	// 			Title:   "quanta-quest-app",
	// 			Message: "",
	// 			Icon:    icon,
	// 		},
	// 	},
	// })

	// if err != nil {
	// 	log.Fatal(err)
	// }
}
