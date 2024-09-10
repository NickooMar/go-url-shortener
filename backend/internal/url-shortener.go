package internal

import (
	"encoding/json"
	"fmt"
	"net/http"

	"github.com/go-chi/chi/v5"
	"github.com/lithammer/shortuuid/v4"
)

type URL struct {
	OriginalURL string `json:"original_url"`
	ShortURL    string `json:"short_url"`
}

func ShortenURL() http.HandlerFunc {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		var url URL
		err := json.NewDecoder(r.Body).Decode(&url)
		if err != nil {
			http.Error(w, err.Error(), http.StatusBadRequest)
			return
		}

		if url.OriginalURL == "" {
			w.WriteHeader(http.StatusBadRequest)
			w.Write([]byte("Original URL is required"))
			return
		}

		key := shortuuid.New()

		w.WriteHeader(http.StatusOK)
		w.Write([]byte(fmt.Sprintf("http://localhost:3000/short/redirect/%s", key)))
	})
}

func Redirect() http.HandlerFunc {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		key := chi.URLParam(r, "key")
		if key == "" {
			w.WriteHeader(http.StatusBadRequest)
			w.Write([]byte("Key is required"))
			return
		}
		http.Redirect(w, r, key, http.StatusMovedPermanently)
	})
}
