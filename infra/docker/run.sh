#!/bin/bash

PROJECT_NAME="herald"

function start() {
    echo "🚀 Starting Docker Compose for project: $PROJECT_NAME (attached mode)"
    docker-compose -p $PROJECT_NAME up --build
}

function start_bg() {
    echo "🚀 Starting Docker Compose for project: $PROJECT_NAME (background mode)"
    docker-compose -p $PROJECT_NAME up --build -d
}

function stop() {
    echo "🛑 Stopping and cleaning up Docker Compose..."
    docker-compose -p $PROJECT_NAME down --volumes
    echo "🧹 Removing unused Docker images and containers..."
    docker system prune -f
}

function restart() {
    stop
    start
}

function logs() {
    echo "📜 Showing logs for project: $PROJECT_NAME"
    docker-compose -p $PROJECT_NAME logs -f
}

function help_menu() {
    echo "Usage: $0 {start|stop|restart|logs|help}"
    echo "  start   - Start Docker containers"
    echo "  stop    - Stop and clean up Docker containers"
    echo "  restart - Restart containers (stop + start)"
    echo "  logs    - Show container logs"
    echo "  help    - Show this help menu"
}

case "$1" in
    start) start ;;
    stop) stop ;;
    restart) restart ;;
    logs) logs ;;
    help|*) help_menu ;;
esac