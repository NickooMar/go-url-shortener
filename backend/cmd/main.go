package main

import (
	"backend/configs"
	"backend/internal"
	"fmt"
	"log"
	"net/http"

	"github.com/go-chi/chi/v5"
	"github.com/go-chi/chi/v5/middleware"
)

func main() {
	configs := configs.LoadConfig()
	if configs == nil {
		log.Fatal("Failed to load configs")
	}

	r := chi.NewRouter()
	r.Use(middleware.Logger)
	r.Use(middleware.Recoverer)

	r.Get("/health", func(w http.ResponseWriter, r *http.Request) {
		w.WriteHeader(200)
		w.Write([]byte("OK"))
	})
	r.Route("/shorten", func(r chi.Router) {
		r.Post("/create", internal.ShortenURL())
		r.Get("/redirect/{url}", internal.Redirect())
	})

	fmt.Printf("[BACKEND] - Server running on port: %s \n", configs.WebServerPort)
	http.ListenAndServe(":3000", r)
}
