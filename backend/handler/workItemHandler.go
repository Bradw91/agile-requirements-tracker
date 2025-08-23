package handler

import (
	"net/http"

	"github.com/bradw91/agile-requirements-tracker/backend/models"
	"github.com/bradw91/agile-requirements-tracker/backend/service"
	"github.com/gin-gonic/gin"
)

type WorkItemHandler struct {
	workItemService service.WorkItemService
}

func NewWorkItemHandler(workItemService service.WorkItemService) *WorkItemHandler {
	return &WorkItemHandler{
		workItemService: workItemService,
	}
}

func (h *WorkItemHandler) GetWorkItems(c *gin.Context) {
	workItems, err := h.workItemService.GetWorkItems()
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"error":   "Failed to retrieve work items",
			"details": err.Error(),
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"data": workItems,
	})
}

// TODO: Implement the remaining handler methods

func (h *WorkItemHandler) CreateWorkItem(c *gin.Context) {
	var workItem = models.WorkItem{}

	if err := c.ShouldBindJSON(&workItem); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error":   "Invalid JSON Payload",
			"details": err.Error(),
		})
		return
	}

	if err := h.workItemService.CreateWorkItem(&workItem); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"error":   "Failed to create work item",
			"details": err.Error(),
		})
		return
	}

	c.JSON(http.StatusCreated, gin.H{
		"data": workItem,
	})
}

func (h *WorkItemHandler) UpdateWorkItem(c *gin.Context) {
	id := c.Param("id")
	var workItem models.WorkItem

	if err := c.ShouldBindJSON(&workItem); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error":   "Invalid JSON Payload",
			"details": err.Error(),
		})
		return
	}

	if err := h.workItemService.UpdateWorkItem(id, &workItem); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"error":   "Failed to update work item",
			"details": err.Error(),
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"data": workItem,
	})
}

func (h *WorkItemHandler) DeleteWorkItem(c *gin.Context) {
	id := c.Param("id")
	var workItem models.WorkItem

	if err := h.workItemService.DeleteWorkItem(id); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"error":   "Failed to delete work item",
			"details": err.Error(),
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"message":      "Work item deleted successfully",
		"deleted-data": workItem,
	})
}
