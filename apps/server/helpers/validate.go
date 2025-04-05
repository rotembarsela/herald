package helpers

import (
	"encoding/json"
	"net/http"

	"github.com/go-playground/validator/v10"
)

var validate = validator.New()

func BindAndValidate[T any](w http.ResponseWriter, r *http.Request) (*T, bool) {
	var req T

	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		WriteError(w, http.StatusBadRequest, "invalid_request_error", "invalid_json", "Invalid request payload")
		return nil, false
	}

	if err := validate.Struct(req); err != nil {
		var fieldErrors []FieldError

		if validationErrors, ok := err.(validator.ValidationErrors); ok {
			for _, fieldError := range validationErrors {
				fieldErrors = append(fieldErrors, FieldError{
					Field: fieldError.Field(),
					Error: fieldError.ActualTag(),
				})
			}
		}

		WriteError(w, http.StatusBadRequest, "invalid_request_error", "validation_failed", "Validation failed", fieldErrors...)
		return nil, false
	}

	return &req, true
}
