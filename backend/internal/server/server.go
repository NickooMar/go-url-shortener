package server

import (
	"backend/configs"
	"net/http"
	"time"
)

type Server struct {
	WebServerPort string `mapstructure:"WEB_SERVER_PORT"`
	WebServerHost string `mapstructure:"WEB_SERVER_HOST"`
}

func NewServer(configs *configs.Configs) *http.Server {
	NewServer := &Server{
		WebServerPort: configs.WebServerPort,
		WebServerHost: configs.WebServerHost,
	}

	server := &http.Server{
		Addr:         ":" + NewServer.WebServerPort,
		Handler:      NewServer.RegisterRoutes(configs),
		IdleTimeout:  time.Minute,
		ReadTimeout:  20 * time.Second,
		WriteTimeout: 40 * time.Second,
	}

	return server
}
