package main

import (
	"backend/configs"
	"backend/internal/server"
	"context"
	"fmt"
	"log"
	"net/http"
	"os"
	"os/signal"
	"syscall"
	"time"
)

func main() {
	configs := configs.LoadConfig()
	if configs == nil {
		log.Fatal("Failed to load configs")
	}

	errChan := make(chan error, 1)
	srv := server.NewServer(configs)

	fmt.Printf("[BACKEND] - Server running on port: %s \n", configs.WebServerPort)

	go func() {
		if err := srv.ListenAndServe(); err != nil && err != http.ErrServerClosed {
			errChan <- fmt.Errorf("health server error: %w", err)
		}
	}()

	ctx, cancel := context.WithCancel(context.Background())
	defer cancel()

	if err := waitForShutdown(ctx, cancel, errChan, srv); err != nil {
		log.Printf("Error during shutdown: %v", err)
	}
}

func waitForShutdown(ctx context.Context, cancel context.CancelFunc, errChan <-chan error, server *http.Server) error {
	quit := make(chan os.Signal, 1)
	signal.Notify(quit, syscall.SIGINT, syscall.SIGTERM)

	select {
	case <-quit:
		fmt.Println("[SHUT DOWN] - Shutting down gracefully")
	case err := <-errChan:
		return err
	}

	cancel()

	shutdownCtx, shutdownCancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer shutdownCancel()

	if err := server.Shutdown(shutdownCtx); err != nil {
		log.Printf("[SHUT DOWN] - Server forced to shutdown: %v", err)
	}

	return nil
}
