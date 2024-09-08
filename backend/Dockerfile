FROM golang:1.22-alpine

WORKDIR /app

RUN go install github.com/air-verse/air@latest

COPY go.mod go.sum ./
RUN go mod download

COPY . .

EXPOSE 3000

RUN go build -o tmp/main ./cmd

CMD ["air", "-c", ".air.toml"]
