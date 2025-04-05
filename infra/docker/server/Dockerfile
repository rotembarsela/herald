FROM golang:1.23-alpine

WORKDIR /app

RUN go install github.com/air-verse/air@latest

# COPY go.mod go.sum ./
COPY go.mod ./

RUN go mod download

COPY . .

EXPOSE 8080

CMD ["air"]