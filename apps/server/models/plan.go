package models

type Plan struct {
	Title       string `json:"title" validate:"required"`
	Description string `json:"description" validate:"required"`
}
