package routes

import (
	"net/http"

	"github.com/rotembarsela/herald/helpers"
)

func MethodHandler(method string, handler http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		if r.Method != method {
			helpers.WriteError(w, http.StatusMethodNotAllowed, "invalid_request_error", "method_not_allowed", "Method not allowed")
			return
		}
		handler.ServeHTTP(w, r)
	})
}

// For multiple methods
func MethodHandlers(methods []string, handler http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		for _, m := range methods {
			if r.Method == m {
				handler.ServeHTTP(w, r)
				return
			}
		}
		helpers.WriteError(w, http.StatusMethodNotAllowed, "invalid_request_error", "method_not_allowed", "Method not allowed")
	})
}
