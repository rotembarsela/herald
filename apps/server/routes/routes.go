package routes

import (
	"net/http"

	"github.com/rotembarsela/herald/handlers"
	"github.com/rotembarsela/herald/services"
)

func RegisterRoutes(mux *http.ServeMux) {
	apiV1 := http.NewServeMux()

	planService := &services.DefaultPlanService{}
	planHandler := &handlers.PlanHandler{Service: planService}

	//apiV1.Handle("/users", MethodHandler(http.MethodGet, handlers.UsersHandler()))
	apiV1.Handle("/plans", MethodHandlers([]string{http.MethodGet, http.MethodPost}, planHandler))

	mux.Handle("/api/v1/", http.StripPrefix("/api/v1", apiV1))

	mux.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		w.Write([]byte("Hello, World!"))
	})
}
