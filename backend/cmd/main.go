package main

import (
	"backend/configs"
	"backend/internal/server"
	"fmt"
	"log"
)

func main() {
	configs := configs.LoadConfig()
	if configs == nil {
		log.Fatal("Failed to load configs")
	}

	srv := server.NewServer(configs)

	fmt.Printf("[BACKEND] - Server running on port: %s \n", configs.WebServerPort)

	if err := srv.ListenAndServe(); err != nil {
		log.Fatalf("Failed to start server: %v", err)
	}
}
