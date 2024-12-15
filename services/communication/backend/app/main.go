package main

import (
	"context"

	"app/config"
	"app/server"
)

// @title communication service web api
// @description communication serviceのWebAPI
// @host localhost:8080
func main() {
	ctx, cancel := context.WithCancel(context.Background())
	defer cancel()

	conf := config.GetConfig()

	server.Run(ctx, conf)
}
