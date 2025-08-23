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
func (w *workItemService) CreateWorkItem(*models.WorkItem) error {
	panic("unimplemented")
}

// DeleteWorkItem implements WorkItemServiceInterface.
func (w *workItemService) DeleteWorkItem(id string) error {
	panic("unimplemented")
}

// GetWorkItems implements WorkItemServiceInterface.
func (w *workItemService) GetWorkItems() ([]models.WorkItem, error) {
	panic("unimplemented")
}

// UpdateWorkItem implements WorkItemServiceInterface.
func (w *workItemService) UpdateWorkItem(id string, item *models.WorkItem) error {
	panic("unimplemented")
}

func NewWorkItemService(repo repository.WorkItemRepository) WorkItemService {
	return &workItemService{
		repo: repo,
	}
}
