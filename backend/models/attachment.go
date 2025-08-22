package models

// Attachment represents a file or document attached to a work item.

type Attachment struct {
	ID          string  `json:"id" db:"id"`
	FileName    string  `json:"file_name" db:"file_name"`
	URL         *string `json:"url" db:"url"`
	ContentType *string `json:"content_type" db:"content_type"`
	Size        int64   `json:"size" db:"size"`
	Description *string `json:"description,omitempty" db:"description"`
	UploadedBy  *User   `json:"uploaded_by" db:"-"`
}
