# Makefile
.PHONY: db-up db-down db-logs db-shell db-reset

# Start PostgreSQL container
db-up:
	docker-compose up -d postgres

# Stop PostgreSQL container
db-down:
	docker-compose down

# View PostgreSQL logs
db-logs:
	docker-compose logs -f postgres

# Connect to PostgreSQL shell
db-shell:
	docker-compose exec postgres psql -U admin -d agile_requirements_tracker

# Reset database (stop, remove volume, start)
db-reset:
	docker-compose down
	docker volume rm $$(basename $$(pwd))_postgres_data
	docker-compose up -d postgres

# Run the application
run:
	go run main.go

# Build the application
build:
	go build -o bin/agile-requirements-tracker main.go