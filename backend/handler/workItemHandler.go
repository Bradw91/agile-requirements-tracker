package handler

import (
	"log"

	"github.com/bradw91/agile-requirements-tracker/backend/service"
	"github.com/gin-gonic/gin"
)

type WorkItemHandler struct {
	workItemService service.WorkItemService
}

func NewWorkItemHandler(s *service.WorkItemService) *WorkItemHandler {
	return &WorkItemHandler{
		workItemService: *s,
	}
}

func (h *WorkItemHandler) getWorkItems(c *gin.Context) {
	workItems, err := h.workItemService.GetWorkItems()
	if err != nil {
		log.Fatal(err)
	}
	c.JSON(200, workItems)
}

// TODO: Implement the remaining handler methods
