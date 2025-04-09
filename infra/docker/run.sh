#!/bin/bash

set -e

PROJECT_NAME="herald"

# Detect if we are inside Docker container or not
if [ -f /.dockerenv ]; then
  # Inside Docker container
  REPO_ROOT_DIR="/app"
else
  # Outside Docker container, detect script location
  SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
  REPO_ROOT_DIR="$(cd "$SCRIPT_DIR/../.." && pwd)"
fi

DOCKER_COMPOSE_FILE="$REPO_ROOT_DIR/infra/docker/docker-compose.yml"

echo "Using docker-compose.yml at: $DOCKER_COMPOSE_FILE"
echo "Project root: $REPO_ROOT_DIR"

function start() {
    echo "🚀 Starting Docker Compose for project: $PROJECT_NAME (attached mode)"
    docker-compose -p $PROJECT_NAME -f "$DOCKER_COMPOSE_FILE" --project-directory "$REPO_ROOT_DIR" up --build
}

function start_bg() {
    echo "🚀 Starting Docker Compose for project: $PROJECT_NAME (background mode)"
    docker-compose -p $PROJECT_NAME -f "$DOCKER_COMPOSE_FILE" --project-directory "$REPO_ROOT_DIR" up --build -d
}

function stop() {
    echo "🛑 Stopping and cleaning up Docker Compose..."
    docker-compose -p $PROJECT_NAME -f "$DOCKER_COMPOSE_FILE" --project-directory "$REPO_ROOT_DIR" down --volumes
    echo "🧹 Removing unused Docker images and containers..."
    docker system prune -f
}

function restart() {
    stop
    start
}

function logs() {
    echo "📜 Showing logs for project: $PROJECT_NAME"
    docker-compose -p $PROJECT_NAME -f "$DOCKER_COMPOSE_FILE" --project-directory "$REPO_ROOT_DIR" logs -f
}

function help_menu() {
    echo "Usage: $0 {start|start_bg|stop|restart|logs|help}"
    echo "  start     - Start Docker containers (attached)"
    echo "  start_bg  - Start Docker containers in background (detached)"
    echo "  stop      - Stop and clean up Docker containers"
    echo "  restart   - Restart containers (stop + start)"
    echo "  logs      - Show container logs"
    echo "  help      - Show this help menu"
}

case "$1" in
    start) start ;;
    start_bg) start_bg ;;
    stop) stop ;;
    restart) restart ;;
    logs) logs ;;
    help|*) help_menu ;;
esac
