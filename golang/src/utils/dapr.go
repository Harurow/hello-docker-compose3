package utils

import (
	"fmt"
	"os"
	"strconv"
)

func getDaprPort() int {
	env := os.Getenv("DAPR_HTTP_PORT")
	if env == "" {
		return 3500
	}

	value, e := strconv.Atoi(env)
	if e != nil {
		return 3500
	}
	return value
}

var dapr_port = getDaprPort()

const state_store_name = "statestore"

var state_store_url = fmt.Sprintf("http://localhost:%d/v1.0/state/%s", dapr_port, state_store_name)

func GetStateStoreUrl() string {
	return state_store_url
}
