# Build stage
FROM golang:1.22-alpine AS build-env

RUN apk add --update --upgrade --no-cache build-base git

ARG BACKEND_WEB_SERVER_PORT

WORKDIR /go/src

COPY . .

# Build the Go binary
RUN CGO_ENABLED=0 GOOS=linux go build -ldflags="-s -w" cmd/main.go

# Final stage
FROM alpine:3.17.0

WORKDIR /app

# Copy the built binary from the build stage
COPY --from=build-env /go/src/ .

ENV BACKEND_WEB_SERVER_PORT=${BACKEND_WEB_SERVER_PORT}

COPY . .

# Expose the port
EXPOSE ${BACKEND_WEB_SERVER_PORT}

ENTRYPOINT ["./main"]
