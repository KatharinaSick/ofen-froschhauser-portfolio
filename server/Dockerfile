# syntax=docker/dockerfile:1

# See https://docs.docker.com/language/golang/build-images/#multi-stage-builds

##
## Build
##
FROM golang:1.19-buster AS build

WORKDIR /app
COPY go.mod ./
COPY go.sum ./
RUN go mod download

COPY . ./
RUN go build -o /server .

###
### Deploy
###
FROM gcr.io/google-appengine/debian11

ENV PORT=${PORT}

WORKDIR /

COPY --from=build /server /server

EXPOSE ${PORT}

USER nonroot:nonroot

ENTRYPOINT ["/server"]