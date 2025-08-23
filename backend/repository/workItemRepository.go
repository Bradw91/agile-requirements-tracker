package repository

import (
	"github.com/bradw91/agile-requirements-tracker/backend/models"
	"github.com/jmoiron/sqlx"
)

type WorkItemRepository interface {
	CreateWorkItem(item *models.WorkItem) error
	GetWorkItems() ([]models.WorkItem, error)
	UpdateWorkItem(id string, item *models.WorkItem) error
	DeleteWorkItem(id string) error
}

type workItemRepository struct {
	db *sqlx.DB
}

// CreateWorkItem inserts a new work item into the database.
func (r *workItemRepository) CreateWorkItem(item *models.WorkItem) error {
	query := `
INSERT INTO work_items (
    title, description, type, parent_id, status,
    tshirt_size, acceptance_criteria, story_points, business_value,
    resolution, incident_number,
    expected_result, input_data, setup_steps, actual_result
) VALUES (
    :title, :description, :type, :parent_id, :status,
    :tshirt_size, :acceptance_criteria, :story_points, :business_value,
    :resolution, :incident_number,
    :expected_result, :input_data, :setup_steps, :actual_result
)
RETURNING id, created_at, updated_at
	`
	row, err := r.db.NamedQuery(query, item)
	if err != nil {
		return err
	}
	defer row.Close()

	if row.Next() {
		return row.Scan(&item.ID, &item.CreatedAt, &item.UpdatedAt)
	}

	return nil
}

// GetWorkItems retrieves all work items from the database.
func (r *workItemRepository) GetWorkItems() ([]models.WorkItem, error) {
	items := []models.WorkItem{}

	query := `
	SELECT
		id, title, description, type, parent_id, status,
		tshirt_size, acceptance_criteria, story_points, business_value,
		resolution, incident_number,
		expected_result, input_data, setup_steps, actual_result,
		created_at, updated_at
	FROM work_items
	`
	err := r.db.Select(&items, query)
	if err != nil {
		return nil, err
	}
	return items, nil
}

// UpdateWorkItem updates an existing work item in the database.
func (r *workItemRepository) UpdateWorkItem(id string, item *models.WorkItem) error {
	// TODO: Implement database update logic here
	return nil
}

// DeleteWorkItem deletes a work item from the database.
func (r *workItemRepository) DeleteWorkItem(id string) error {
	// TODO: Implement database delete logic here
	return nil
}

func NewWorkItemRepository(db *sqlx.DB) WorkItemRepository {
	return &workItemRepository{
		db: db,
	}
}
