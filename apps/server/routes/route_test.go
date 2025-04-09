package routes

import (
	"bytes"
	"encoding/json"
	"net/http"
	"net/http/httptest"
	"testing"

	"github.com/rotembarsela/herald/handlers"
	"github.com/rotembarsela/herald/models"
)

type MockPlanService struct{}

func (m *MockPlanService) ListPlans() []string {
	return []string{"MockPlan"}
}

func (m *MockPlanService) CreatePlan(plan models.Plan) error {
	return nil
}

func setupTestRouter() *http.ServeMux {
	mux := http.NewServeMux()

	planService := &MockPlanService{}
	planHandler := &handlers.PlanHandler{Service: planService}

	apiV1 := http.NewServeMux()
	apiV1.Handle("/plans", MethodHandlers([]string{http.MethodGet, http.MethodPost}, planHandler))
	mux.Handle("/api/v1/", http.StripPrefix("/api/v1", apiV1))

	return mux
}

func TestRouter_PlansEndpoint(t *testing.T) {
	mux := setupTestRouter()

	tests := []struct {
		name           string
		method         string
		path           string
		body           string
		expectedStatus int
		expectedCode   string
	}{
		{
			name:           "GET /api/v1/plans - success",
			method:         http.MethodGet,
			path:           "/api/v1/plans",
			body:           "",
			expectedStatus: http.StatusOK,
			expectedCode:   "",
		},
		{
			name:           "POST /api/v1/plans - validation error",
			method:         http.MethodPost,
			path:           "/api/v1/plans",
			body:           `{"name": "", "price": -10}`,
			expectedStatus: http.StatusBadRequest,
			expectedCode:   "validation_failed",
		},
		{
			name:           "DELETE /api/v1/plans - method not allowed",
			method:         http.MethodDelete,
			path:           "/api/v1/plans",
			body:           "",
			expectedStatus: http.StatusMethodNotAllowed,
			expectedCode:   "method_not_allowed",
		},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			req := httptest.NewRequest(tt.method, tt.path, bytes.NewBufferString(tt.body))
			req.Header.Set("Content-Type", "application/json")
			rec := httptest.NewRecorder()

			mux.ServeHTTP(rec, req)

			res := rec.Result()
			defer res.Body.Close()

			if res.StatusCode != tt.expectedStatus {
				t.Fatalf("expected status %d, got %d", tt.expectedStatus, res.StatusCode)
			}

			var body map[string]interface{}
			if err := json.NewDecoder(res.Body).Decode(&body); err != nil {
				t.Fatalf("failed to decode response body: %v", err)
			}

			if tt.expectedCode != "" {
				errorObject := body["error"].(map[string]interface{})
				if errorObject["code"] != tt.expectedCode {
					t.Fatalf("expected error code %s, got %v", tt.expectedCode, errorObject["code"])
				}
			}
		})
	}
}
