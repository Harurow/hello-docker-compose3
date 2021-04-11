FROM golang:1.16.3-alpine3.13 as builder
RUN apk add --no-cache build-base
WORKDIR /go/src/app
COPY ./src .

RUN go build ./app.go

FROM alpine:latest
WORKDIR /app
COPY --from=builder /go/src/app/app /app
CMD ./app
