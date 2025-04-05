package main

import (
	"log"
	"net/http"

	"github.com/rotembarsela/herald/middleware"
	"github.com/rotembarsela/herald/routes"
)

func main() {
	mux := http.NewServeMux()
	routes.RegisterRoutes(mux)

	handler := middleware.Chain(mux, middleware.RecoverPanic, middleware.Logger)

	log.Println("Server running on :8080")
	if err := http.ListenAndServe(":8080", handler); err != nil {
		log.Fatal(err)
	}
}
