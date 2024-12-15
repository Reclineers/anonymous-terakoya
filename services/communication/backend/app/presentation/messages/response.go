package messages

import "time"

type readMessagesResponse struct {
	ID        string    `json:"id"`
	Content   string    `json:"content"`
	UserID    string    `json:"userId"`
	Timestamp time.Time `json:"timestamp"`
	IsOwn     bool      `json:"isOwn"`
}
