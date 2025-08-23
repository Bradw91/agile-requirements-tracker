// models/models.go
package models

import (
	"time"
)

type WorkItemType string

const (
	Epic      WorkItemType = "epic"
	Feature   WorkItemType = "feature"
	UserStory WorkItemType = "user_story"
	Defect    WorkItemType = "defect"
	Test      WorkItemType = "test"
)

type WorkItem struct {
	ID          string       `json:"id" db:"id"`
	Title       string       `json:"title" db:"title"`
	Description *string      `json:"description" db:"description"`
	Type        WorkItemType `json:"type" db:"type"`
	Owner       *[]User      `json:"owner,omitempty" db:"-"`
	ParentID    *string      `json:"parent_id,omitempty" db:"parent_id"`
	Status      *string      `json:"status" db:"status"`

	// Epic
	TShirtSize *string `json:"tshirt_size,omitempty" db:"tshirt_size"`

	// Feature + UserStory
	AcceptanceCriteria *string `json:"acceptance_criteria,omitempty" db:"acceptance_criteria"`

	// UserStory
	StoryPoints   *int          `json:"story_points,omitempty" db:"story_points"`
	BusinessValue *int          `json:"business_value,omitempty" db:"business_value"`
	Attachments   *[]Attachment `json:"attachments,omitempty" db:"-"`

	// Defect
	Resolution     *string `json:"resolution,omitempty" db:"resolution"`
	IncidentNumber *string `json:"incident_number,omitempty" db:"incident_number"`

	// Test
	ExpectedResult *string `json:"expected_result,omitempty" db:"expected_result"`
	InputData      *string `json:"input_data,omitempty" db:"input_data"`
	SetupSteps     *string `json:"setup_steps,omitempty" db:"setup_steps"`
	ActualResult   *string `json:"actual_result,omitempty" db:"actual_result"`

	// Timestamps
	CreatedAt time.Time `json:"created_at" db:"created_at"`
	UpdatedAt time.Time `json:"updated_at" db:"updated_at"`
}

// WorkItemWithRelations includes all related data in a single query
type WorkItemWithRelations struct {
	WorkItem
	Parent      *WorkItem    `json:"parent,omitempty"`
	Children    []WorkItem   `json:"children,omitempty"`
	Owners      []User       `json:"owners,omitempty"`
	Attachments []Attachment `json:"attachments,omitempty"`
}
