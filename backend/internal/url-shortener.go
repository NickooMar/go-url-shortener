package internal

import (
	"encoding/json"
	"errors"
	"net/http"
	"sync"

	"github.com/go-chi/chi/v5"
	"github.com/lithammer/shortuuid/v4"
)

type URLMapper struct {
	urls map[string]string
	mu   sync.RWMutex
}

type RequestBody struct {
	URLs []string `json:"urls"`
}

type ResponseBody struct {
	ShortURLs map[string]string `json:"short_urls"`
}

var (
	ErrJSONDecode  = errors.New("failed to decode JSON request")
	ErrJSONEncode  = errors.New("failed to encode JSON response")
	ErrKeyRequired = errors.New("key is required")
	ErrURLNotFound = errors.New("URL not found")
)

func NewURLMapper() *URLMapper {
	return &URLMapper{
		urls: make(map[string]string),
	}
}

func (m *URLMapper) ShortenURL(baseURL string) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		var reqBody RequestBody
		if err := json.NewDecoder(r.Body).Decode(&reqBody); err != nil {
			http.Error(w, ErrJSONDecode.Error(), http.StatusBadRequest)
			return
		}

		respBody := ResponseBody{ShortURLs: make(map[string]string)}
		var wg sync.WaitGroup

		for _, url := range reqBody.URLs {
			wg.Add(1)
			go func(url string) {
				defer wg.Done()
				key := shortuuid.New()
				m.insertMappedURL(key, url)
				respBody.ShortURLs[url] = baseURL + key
			}(url)
		}

		wg.Wait()

		w.Header().Set("Content-Type", "application/json")
		if err := json.NewEncoder(w).Encode(respBody); err != nil {
			http.Error(w, ErrJSONEncode.Error(), http.StatusInternalServerError)
		}
		w.WriteHeader(http.StatusOK)
	}
}

func (m *URLMapper) Redirect() http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		key := chi.URLParam(r, "key")
		if key == "" {
			http.Error(w, ErrKeyRequired.Error(), http.StatusBadRequest)
			return
		}

		url := m.getMappedURL(key)
		if url == "" {
			http.Error(w, ErrURLNotFound.Error(), http.StatusNotFound)
			return
		}

		http.Redirect(w, r, url, http.StatusMovedPermanently)
	}
}

func (m *URLMapper) insertMappedURL(key, url string) {
	m.mu.Lock()
	defer m.mu.Unlock()
	m.urls[key] = url
}

func (m *URLMapper) getMappedURL(key string) string {
	m.mu.RLock()
	defer m.mu.RUnlock()
	return m.urls[key]
}
