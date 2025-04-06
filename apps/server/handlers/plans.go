package handlers

import (
	"net/http"

	"github.com/rotembarsela/herald/helpers"
	"github.com/rotembarsela/herald/models"
	"github.com/rotembarsela/herald/services"
)

type PlanHandler struct {
	Service services.PlanService
}

func (h *PlanHandler) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	switch r.Method {
	case http.MethodGet:
		h.handleGetPlans(w, r)
	case http.MethodPost:
		h.handleCreatePlan(w, r)
	default:
		helpers.WriteError(w, http.StatusMethodNotAllowed, "invalid_request_error", "method_not_allowed", "Method not allowed")
	}
}

func (h *PlanHandler) handleGetPlans(w http.ResponseWriter, r *http.Request) {
	plans := h.Service.ListPlans()
	helpers.WriteJSON(w, http.StatusOK, map[string]interface{}{
		"plans": plans,
	}, nil)
}

func (h *PlanHandler) handleCreatePlan(w http.ResponseWriter, r *http.Request) {
	plan, ok := helpers.BindAndValidate[models.Plan](w, r)
	if !ok {
		return
	}

	if err := h.Service.CreatePlan(*plan); err != nil {
		helpers.WriteError(w, http.StatusInternalServerError, "internal_error", "create_failed", "Failed to create plan")
		return
	}

	helpers.WriteJSON(w, http.StatusCreated, map[string]interface{}{
		"plan": plan,
	}, nil)
}
