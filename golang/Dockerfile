FROM golang:1.16.3-alpine3.13
RUN apk add --no-cache build-base
WORKDIR /go/src/app
COPY ./src .
RUN go build ./app.go
EXPOSE 3002
CMD ["go", "run", "./app.go"]
