package utils

import (
	"os"
	"strconv"
)

func getHttpPort() int {
	env := os.Getenv("HTTP_PORT")
	if env == "" {
		return 3000
	}

	value, e := strconv.Atoi(env)
	if e != nil {
		return 3000
	}
	return value
}

var port = getHttpPort()

func GetHttpPort() int {
	return port
}
