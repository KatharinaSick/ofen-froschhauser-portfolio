package main

import (
	"fmt"
	"github.com/rs/cors"
	"log"
	"net/http"
	"os"
)

func main() {
	mux := http.NewServeMux()
	mux.HandleFunc("/upload", upload)

	c := cors.New(cors.Options{
		AllowedOrigins:   []string{"*"},
		AllowedHeaders:   []string{"*"},
		AllowedMethods:   []string{http.MethodGet, http.MethodPost, http.MethodDelete, http.MethodOptions},
		AllowCredentials: true,
		Debug:            true,
	})

	handler := c.Handler(mux)

	err := http.ListenAndServe(fmt.Sprintf(":%s", os.Getenv("PORT")), handler)
	if err != nil {
		log.Fatalf("Failed to start server: %v", err)
	}
}
