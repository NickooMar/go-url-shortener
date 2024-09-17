package server

import (
	"backend/configs"
	"backend/internal"
	"fmt"
	"net/http"

	"github.com/go-chi/chi/v5"
	"github.com/go-chi/chi/v5/middleware"
)

func (s *Server) RegisterRoutes(configs *configs.Configs) http.Handler {
	r := chi.NewRouter()
	r.Use(middleware.Logger)
	r.Use(middleware.Recoverer)

	r.Get("/health", s.healthHandler)
	r.Route("/short", func(r chi.Router) {
		s.URLShortenerHandler(r, configs)
	})

	return r
}

func (s *Server) healthHandler(w http.ResponseWriter, r *http.Request) {
	w.WriteHeader(200)
	w.Write([]byte("OK! \n"))
}

func (s *Server) URLShortenerHandler(r chi.Router, configs *configs.Configs) {
	mapper := internal.NewURLMapper()
	r.Post("/create", mapper.ShortenURL(fmt.Sprintf("http://%s:%s/short/redirect/", configs.WebServerHost, configs.WebServerPort)))
	r.Get("/redirect/{key}", mapper.Redirect())
}
