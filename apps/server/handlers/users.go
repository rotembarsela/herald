package handlers

import (
	"net/http"

	"github.com/rotembarsela/herald/helpers"
)

func UsersHandler(w http.ResponseWriter, r *http.Request) {
	switch r.Method {
	case http.MethodGet:
		users := []string{"Rotem", "Alex", "Sam"}
		helpers.WriteJSON(w, http.StatusOK, map[string]interface{}{
			"users": users,
		}, nil)

	default:
		helpers.WriteError(w, http.StatusMethodNotAllowed, "invalid_request_error", "method_not_allowed", "Method not allowed")
	}
}
