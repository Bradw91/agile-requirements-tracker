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

	// Group Routes
	workItemsApi := router.Group("/api/v1/workItems")
	{
		workItemsApi.GET("/", getWorkItems)
		workItemsApi.POST("/", createWorkItem)
		workItemsApi.PUT("/:id", updateWorkItem)
		workItemsApi.DELETE("/:id", deleteWorkItem)
	}

	userApi := router.Group("/api/v1/users")
	{
		userApi.GET("/", getUsers)
		userApi.POST("/", createUser)
		userApi.PUT("/:id", updateUser)
		userApi.DELETE("/:id", deleteUser)
	}

	router.Run(":8080")
}
