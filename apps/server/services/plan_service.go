package services

import "github.com/rotembarsela/herald/models"

type PlanService interface {
	ListPlans() []string
	CreatePlan(plan models.Plan) error
}

type DefaultPlanService struct{}

func (s *DefaultPlanService) ListPlans() []string {
	return []string{"Basic", "Premium"}
}

func (s *DefaultPlanService) CreatePlan(plan models.Plan) error {
	// TODO: DB
	return nil
}
