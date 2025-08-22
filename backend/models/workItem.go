package models

type WorkItemType string

const (
	Epic      WorkItemType = "epic"
	Feature   WorkItemType = "feature"
	UserStory WorkItemType = "user_story"
	Defect    WorkItemType = "defect"
	Test      WorkItemType = "test"
	Task      WorkItemType = "task"
)

type WorkItem struct {
	ID          string       `json:"id" db:"id"`
	Title       string       `json:"title" db:"title"`
	Description string       `json:"description" db:"description"`
	Type        WorkItemType `json:"type" db:"type"`
	Owner       []User       `json:"owner" db:"-"`
	ParentID    *string      `json:"parent_id,omitempty" db:"parent_id"`
	Status      string       `json:"status" db:"status"`
}
