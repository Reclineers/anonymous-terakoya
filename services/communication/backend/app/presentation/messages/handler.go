package messages

import (
	"app/application/messages"
	"app/presentation/settings"

	"github.com/gin-gonic/gin"
)

type handler struct {
	readMessagesUseCase *messages.ReadMessagesUseCase
}

func Handler(readMessagesUseCase *messages.ReadMessagesUseCase) handler {
	return handler{
		readMessagesUseCase: readMessagesUseCase,
	}
}

// ReadMessages godoc
// @Summary メッセージ一覧を取得する
// @Tags messages
// @Accept json
// @Produce json
// @Success 200 {object} readMessagesResponse
// @Router /v1/messages [GET]
func (h handler) ReadMesssages(ctx *gin.Context) {
	dtos := h.readMessagesUseCase.Run(ctx)

	var messages []readMessagesResponse

	for _, dto := range dtos {
		messages = append(messages, readMessagesResponse{
			ID:        dto.ID,
			Content:   dto.Content,
			UserID:    dto.UserID,
			Timestamp: dto.Timestamp,
			IsOwn:     dto.IsOwn,
		})
	}

	settings.ReturnStatusOK(ctx, messages)
}
