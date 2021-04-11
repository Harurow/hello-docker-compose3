package main

import (
	"app/handlers/orders"
	"app/utils"
	"fmt"
	"log"
	"net/http"

	"github.com/gorilla/mux"
)

var PORT = utils.GetHttpPort()

func main() {
	router := mux.NewRouter()
	router.HandleFunc("/order", orders.GetHandler).Methods("GET")
	router.HandleFunc("/order", orders.PostHandler).Methods("POST")

	fmt.Printf("golang > Hello, docker. (%d)\n", PORT)
	log.Fatal(http.ListenAndServe(fmt.Sprintf(":%d", PORT), router))
}
