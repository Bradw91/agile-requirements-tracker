package main

import (
	"log"

	"github.com/bradw91/agile-requirements-tracker/backend/handler"
	"github.com/bradw91/agile-requirements-tracker/backend/repository"
	"github.com/bradw91/agile-requirements-tracker/backend/service"
	"github.com/gin-gonic/gin"
	"github.com/jmoiron/sqlx"
	_ "github.com/lib/pq" // PostgreSQL driver
)

func main() {

	db, err := sqlx.Connect("postgres", "host=localhost port=5432 user=admin password=admin dbname=agile_requirements_tracker sslmode=disable")
	if err != nil {
		log.Fatal("Database Connection Failed:", err)
	}
	defer db.Close()

	if err := db.Ping(); err != nil {
		log.Fatal("Database Ping Failed:", err)
	}
	log.Println("Database Connected")

	router := gin.Default()

	router.GET("/", func(c *gin.Context) {
		c.JSON(200, gin.H{
			"message": "Hello, World!",
		})
	})

	setupWorkItemRoutes(router, db)

	// Call setupWorkItemRoutes if needed, e.g. setupWorkItemRoutes(router)
	router.Run(":8080")
}

func setupWorkItemRoutes(router *gin.Engine, db *sqlx.DB) {
	workItemRepo := repository.NewWorkItemRepository(db)
	workItemService := service.NewWorkItemService(workItemRepo)
	workItemHandler := handler.NewWorkItemHandler(workItemService)

	// Define API group for work items
	workItemsApi := router.Group("/api/workitems")
	{
		workItemsApi.GET("/", workItemHandler.GetWorkItems)
		workItemsApi.POST("/", workItemHandler.CreateWorkItem)
		workItemsApi.PUT("/:id", workItemHandler.UpdateWorkItem)
		workItemsApi.DELETE("/:id", workItemHandler.DeleteWorkItem)
	}
}
