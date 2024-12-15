package route

import (
	"app/presentation/health_handler"
	"app/presentation/settings"

	"app/docs"

	ginpkg "github.com/gin-gonic/gin"
	swaggerFiles "github.com/swaggo/files"
	ginSwagger "github.com/swaggo/gin-swagger"
)

func InitRoute(api *ginpkg.Engine) {
	api.Use(settings.ErrorHandler())
	v1 := api.Group("/v1")
	v1.GET("/health", health_handler.HealthCheck)
	{
		swaggerRouter(v1)
	}
}

func swaggerRouter(r *ginpkg.RouterGroup) {
	docs.SwaggerInfo.BasePath = ""
	group := r.Group("/swagger/*any")
	group.GET("", ginSwagger.WrapHandler(swaggerFiles.Handler))
}
