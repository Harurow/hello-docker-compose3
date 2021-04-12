FROM golang:alpine as builder
RUN apk add --no-cache build-base
WORKDIR /go/src/app
COPY ./src .

RUN go build ./app.go

FROM alpine:latest
WORKDIR /app
COPY --from=builder /go/src/app/app /app
CMD ./app
