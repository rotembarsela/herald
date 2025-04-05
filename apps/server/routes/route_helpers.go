package routes

import (
	"net/http"

	"github.com/rotembarsela/herald/helpers"
)

func MethodHandler(method string, handlerFunc http.HandlerFunc) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		if r.Method != method {
			helpers.WriteError(w, http.StatusMethodNotAllowed, "invalid_request_error", "method_not_allowed", "Method not allowed")
			return
		}
		handlerFunc(w, r)
	}
}

func MethodHandlers(methods []string, handlerFunc http.HandlerFunc) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		for _, m := range methods {
			if r.Method == m {
				handlerFunc(w, r)
				return
			}
		}
		helpers.WriteError(w, http.StatusMethodNotAllowed, "invalid_request_error", "method_not_allowed", "Method not allowed")
	}
}
