package handlers

import (
	"net/http"

	"github.com/rotembarsela/herald/helpers"
	"github.com/rotembarsela/herald/models"
)

func PlansHandler(w http.ResponseWriter, r *http.Request) {
	switch r.Method {
	case http.MethodGet:
		handleGetPlans(w, r)
	case http.MethodPost:
		handleCreatePlan(w, r)
	default:
		helpers.WriteError(w, http.StatusMethodNotAllowed, "invalid_request_error", "method_not_allowed", "Method not allowed")
	}
}

func handleGetPlans(w http.ResponseWriter, r *http.Request) {
	helpers.WriteJSON(w, http.StatusOK, map[string]interface{}{
		"plans": []string{"Basic", "Premium"},
	}, nil)
}

func handleCreatePlan(w http.ResponseWriter, r *http.Request) {
	plan, ok := helpers.BindAndValidate[models.Plan](w, r)
	if !ok {
		return
	}

	helpers.WriteJSON(w, http.StatusCreated, map[string]interface{}{
		"plan": plan,
	}, nil)
}
