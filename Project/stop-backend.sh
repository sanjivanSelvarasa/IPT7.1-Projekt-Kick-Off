#!/bin/bash

# Stop Docker container script for Backend
# Usage: ./stop-backend.sh

echo "Stopping website backend..."
echo ""

# Check if Docker Compose is installed
if ! command -v docker-compose &> /dev/null; then
    echo "❌ Docker Compose is not installed."
    exit 1
fi

# Change to Backend directory and stop container
cd Backend
echo "Stopping the backend container..."
docker-compose down

echo ""
echo "✅ Backend stopped successfully"
