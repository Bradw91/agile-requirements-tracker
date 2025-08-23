package main

import (
	"github.com/gin-gonic/gin"
)

func main() {
	router := gin.Default()

	router.GET("/", func(c *gin.Context) {
		c.JSON(200, gin.H{
			"message": "Hello, World!",
		})
	})

	// Define API group for work items
	workItemsApi := router.Group("/api/workitems")
	{
		workItemsApi.GET("/", workItemHandler.GetWorkItems)
		workItemsApi.POST("/", workItemHandler.CreateWorkItem)
		workItemsApi.PUT("/:id", workItemHandler.UpdateWorkItem)
		workItemsApi.DELETE("/:id", workItemHandler.DeleteWorkItem)
	}

	router.Run(":8080")
}
