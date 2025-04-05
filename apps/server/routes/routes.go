package routes

import (
	"net/http"

	"github.com/rotembarsela/herald/handlers"
)

func RegisterRoutes(mux *http.ServeMux) {
	apiV1 := http.NewServeMux()

	apiV1.HandleFunc("/users", MethodHandler(http.MethodGet, handlers.UsersHandler))
	apiV1.HandleFunc("/plans", MethodHandlers([]string{http.MethodGet, http.MethodPost}, handlers.PlansHandler))

	mux.Handle("/api/v1/", http.StripPrefix("/api/v1", apiV1))

	mux.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		w.Write([]byte("Hello, World!"))
	})
}
