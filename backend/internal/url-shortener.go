package internal

import (
	"encoding/json"
	"fmt"
	"net/http"
)

type URL struct {
	OriginalURL string `json:"original_url"`
}

func ShortenURL() http.HandlerFunc {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		var url URL
		err := json.NewDecoder(r.Body).Decode(&url)
		if err != nil {
			http.Error(w, err.Error(), http.StatusBadRequest)
			return
		}

		fmt.Printf("Original URL: %s \n", url.OriginalURL)
	})
}

func Redirect() http.HandlerFunc {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		url := r.URL.Query().Get("url")
		fmt.Printf("Redirecting to: %s \n", url)
		http.Redirect(w, r, url, http.StatusMovedPermanently)
	})
}
