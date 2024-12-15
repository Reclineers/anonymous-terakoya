package route

import (
	"app/presentation/health_handler"
	"app/presentation/settings"

	"app/docs"

	ginpkg "github.com/gin-gonic/gin"
	swaggerFiles "github.com/swaggo/files"
	ginSwagger "github.com/swaggo/gin-swagger"

	messageApp "app/application/messages"
	messagePre "app/presentation/messages"
)

func InitRoute(api *ginpkg.Engine) {
	api.Use(settings.ErrorHandler())
	v1 := api.Group("/v1")
	v1.GET("/health", health_handler.HealthCheck)
	{
		swaggerRoute(v1)
		messageRoute(v1)
	}
}

func swaggerRoute(r *ginpkg.RouterGroup) {
	docs.SwaggerInfo.BasePath = ""
	group := r.Group("/swagger/*any")
	group.GET("", ginSwagger.WrapHandler(swaggerFiles.Handler))
}

func messageRoute(r *ginpkg.RouterGroup) {
	h := messagePre.Handler(messageApp.ReadMessagesInteractor())
	group := r.Group("/messages")
	group.GET("", h.ReadMesssages)
}
