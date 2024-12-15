package messages

import (
	"context"
	"time"
)

type ReadMessagesUseCase struct{}

func ReadMessagesInteractor() *ReadMessagesUseCase {
	return &ReadMessagesUseCase{}
}

type ReadMessagesDto struct {
	ID        string    `json:"id"`
	Content   string    `json:"content"`
	UserID    string    `json:"userId"`
	Timestamp time.Time `json:"timestamp"`
	IsOwn     bool      `json:"isOwn"`
}

func (uc *ReadMessagesUseCase) Run(ctx context.Context) []*ReadMessagesDto {

	ucDtos := []*ReadMessagesDto{
		{
			ID:        "1",
			Content:   "こんにちは！",
			UserID:    "user1",
			Timestamp: time.Now().Add(-2 * time.Hour),
			IsOwn:     false,
		},
		{
			ID:        "2",
			Content:   "お元気ですか？",
			UserID:    "user2",
			Timestamp: time.Now().Add(-1 * time.Hour),
			IsOwn:     true,
		},
		{
			ID:        "3",
			Content:   "素晴らしい天気ですね！",
			UserID:    "user1",
			Timestamp: time.Now().Add(-30 * time.Minute),
			IsOwn:     false,
		},
		{
			ID:        "4",
			Content:   "今日は公園に行きませんか？",
			UserID:    "user2",
			Timestamp: time.Now().Add(-15 * time.Minute),
			IsOwn:     true,
		},
		{
			ID:        "5",
			Content:   "いいですね！何時に会いましょうか？",
			UserID:    "user1",
			Timestamp: time.Now(),
			IsOwn:     false,
		},
	}

	return ucDtos
}
