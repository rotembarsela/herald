FROM golang:1.23-alpine

WORKDIR /app

RUN go install github.com/air-verse/air@latest

COPY apps/server/go.mod apps/server/go.sum ./

RUN go mod download

COPY apps/server/ ./

EXPOSE 8080

CMD ["air"]
