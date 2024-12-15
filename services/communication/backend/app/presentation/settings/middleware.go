package settings

import (
	"github.com/gin-gonic/gin"
)

func ErrorHandler() gin.HandlerFunc {
	return func(c *gin.Context) {
		c.Next()
		for _, err := range c.Errors {
			ReturnStatusInternalServerError(c, err)
		}
	}
}
