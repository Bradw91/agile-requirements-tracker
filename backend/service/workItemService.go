package service

import (
	"github.com/bradw91/agile-requirements-tracker/backend/models"
	"github.com/bradw91/agile-requirements-tracker/backend/repository"
)

type WorkItemService interface {
	GetWorkItems() ([]models.WorkItem, error)
	CreateWorkItem(*models.WorkItem) error
	UpdateWorkItem(id string, item *models.WorkItem) error
	DeleteWorkItem(id string) error
}

type workItemService struct {
	repo repository.WorkItemRepository
}

// CreateWorkItem implements WorkItemServiceInterface.
func (s *workItemService) CreateWorkItem(item *models.WorkItem) error {
	return s.repo.CreateWorkItem(item)
}

// DeleteWorkItem implements WorkItemServiceInterface.
func (s *workItemService) DeleteWorkItem(id string) error {
	return s.repo.DeleteWorkItem(id)
}

// GetWorkItems implements WorkItemServiceInterface.
func (s *workItemService) GetWorkItems() ([]models.WorkItem, error) {
	return s.repo.GetWorkItems()
}

// UpdateWorkItem implements WorkItemServiceInterface.
func (s *workItemService) UpdateWorkItem(id string, item *models.WorkItem) error {
	return s.repo.UpdateWorkItem(id, item)
}

func NewWorkItemService(repo repository.WorkItemRepository) WorkItemService {
	return &workItemService{
		repo: repo,
	}
}
