package helpers

import (
	"encoding/json"
	"net/http"
)

type APIResponse struct {
	Object string      `json:"object"`
	Data   interface{} `json:"data,omitempty"`
	Error  *APIError   `json:"error,omitempty"`
	Meta   interface{} `json:"meta,omitempty"`
}

type FieldError struct {
	Field string `json:"field"`
	Error string `json:"error"`
}

type APIError struct {
	Type    string       `json:"type"`
	Message string       `json:"message"`
	Code    string       `json:"code"`
	Fields  []FieldError `json:"fields,omitempty"`
}

func WriteJSON(w http.ResponseWriter, status int, data interface{}, meta interface{}) {
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(status)

	resp := APIResponse{
		Object: "response",
		Data:   data,
		Meta:   meta,
	}

	_ = json.NewEncoder(w).Encode(resp)
}

func WriteError(w http.ResponseWriter, status int, errType, code, message string, fields ...FieldError) {
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(status)

	resp := APIResponse{
		Object: "response",
		Error: &APIError{
			Type:    errType,
			Message: message,
			Code:    code,
			Fields:  fields,
		},
	}

	_ = json.NewEncoder(w).Encode(resp)
}
