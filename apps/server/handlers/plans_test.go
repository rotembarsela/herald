package handlers

import (
	"bytes"
	"encoding/json"
	"net/http"
	"net/http/httptest"
	"testing"

	"github.com/rotembarsela/herald/models"
)

type MockPlanService struct{}

func (m *MockPlanService) ListPlans() []string {
	return []string{"MockPlan"}
}

func (m *MockPlanService) CreatePlan(plan models.Plan) error {
	return nil
}

func TestPlansHandler(t *testing.T) {
	tests := []struct {
		name           string
		method         string
		body           string
		expectedStatus int
		expectedCode   string
	}{
		{
			name:           "GET plans - success",
			method:         http.MethodGet,
			body:           "",
			expectedStatus: http.StatusOK,
			expectedCode:   "",
		},
		{
			name:           "POST plans - validation error",
			method:         http.MethodPost,
			body:           `{"name": "", "price": -10}`,
			expectedStatus: http.StatusBadRequest,
			expectedCode:   "validation_failed",
		},
		{
			name:           "DELETE plans - method not allowed",
			method:         http.MethodDelete,
			body:           "",
			expectedStatus: http.StatusMethodNotAllowed,
			expectedCode:   "method_not_allowed",
		},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			req := httptest.NewRequest(tt.method, "/plans", bytes.NewBufferString(tt.body))
			req.Header.Set("Content-Type", "application/json")
			rec := httptest.NewRecorder()

			handler := &PlanHandler{Service: &MockPlanService{}}
			handler.ServeHTTP(rec, req)

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

func TestPlansHandler_GET(t *testing.T) {
	req := httptest.NewRequest(http.MethodGet, "/plans", nil)
	rec := httptest.NewRecorder()

	handler := &PlanHandler{Service: &MockPlanService{}}
	handler.ServeHTTP(rec, req)

	res := rec.Result()
	defer res.Body.Close()

	if res.StatusCode != http.StatusOK {
		t.Fatalf("expected status 200, got %d", res.StatusCode)
	}

	var body map[string]interface{}
	if err := json.NewDecoder(res.Body).Decode(&body); err != nil {
		t.Fatalf("failed to decode response body: %v", err)
	}

	if body["data"] == nil {
		t.Fatalf("expected data in response, got nil")
	}
}

func TestPlansHandler_POST_ValidationError(t *testing.T) {
	payload := `{"name": "", "price": -10}`
	req := httptest.NewRequest(http.MethodPost, "/plans", bytes.NewBufferString(payload))
	req.Header.Set("Content-Type", "application/json")
	rec := httptest.NewRecorder()

	handler := &PlanHandler{Service: &MockPlanService{}}
	handler.ServeHTTP(rec, req)

	res := rec.Result()
	defer res.Body.Close()

	if res.StatusCode != http.StatusBadRequest {
		t.Fatalf("expected status 400, got %d", res.StatusCode)
	}

	var body map[string]interface{}
	if err := json.NewDecoder(res.Body).Decode(&body); err != nil {
		t.Fatalf("failed to decode response body: %v", err)
	}

	errorObject := body["error"].(map[string]interface{})
	if errorObject["code"] != "validation_failed" {
		t.Fatalf("expected validation_failed error code, got %v", errorObject["code"])
	}
}

func TestPlansHandler_MethodNotAllowed(t *testing.T) {
	req := httptest.NewRequest(http.MethodDelete, "/plans", nil)
	rec := httptest.NewRecorder()

	handler := &PlanHandler{Service: &MockPlanService{}}
	handler.ServeHTTP(rec, req)

	res := rec.Result()
	defer res.Body.Close()

	if res.StatusCode != http.StatusMethodNotAllowed {
		t.Fatalf("expected status 405, got %d", res.StatusCode)
	}
}
