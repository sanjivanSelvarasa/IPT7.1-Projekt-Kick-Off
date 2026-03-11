#!/bin/bash

# Start Docker container script for Backend
# Usage: ./start-backend.sh
# Use ./start-backend.sh -d for detached mode (background)

echo "Starting website backend..."
echo ""

# Check if Docker is installed
if ! command -v docker &> /dev/null; then
    echo "❌ Docker is not installed. Please install Docker first."
    exit 1
fi

# Check if Docker Compose is installed
if ! command -v docker-compose &> /dev/null; then
    echo "❌ Docker Compose is not installed. Please install Docker Compose first."
    exit 1
fi

# Check if Docker daemon is running
if ! docker info &> /dev/null; then
    echo "❌ Docker daemon is not running. Please start Docker."
    exit 1
fi

echo "✅ Docker is installed and running"
echo ""

# Change to Backend directory and start container
cd Backend

# Check for detached flag
if [ "$1" = "-d" ] || [ "$1" = "--detach" ]; then
    echo "Building and starting the backend in detached mode..."
    docker-compose up -d --build
    echo ""
    echo "✅ Backend started in background"
    echo "To view logs: docker-compose logs -f"
    echo "To stop: ./stop-backend.sh (from project root)"
else
    echo "Starting the backend container in foreground mode..."
    echo "Press Ctrl+C to stop"
    echo ""
    docker-compose up --build
    echo ""
    echo "Backend stopped"
fi
