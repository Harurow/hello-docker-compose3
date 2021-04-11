package orders

import (
	"app/utils"
	"bytes"
	"encoding/json"
	"fmt"
	"io/ioutil"
	"net/http"
	"unsafe"
)

var URL = utils.GetStateStoreUrl()

func GetHandler(w http.ResponseWriter, r *http.Request) {
	url := URL + "/order"
	resp, e := http.Get(url)
	if resp != nil {
		defer resp.Body.Close()
	}

	if e != nil {
		fmt.Println(e.Error())
		w.WriteHeader(http.StatusInternalServerError)
		return
	}

	if resp.StatusCode/100 != 2 {
		fmt.Println("Could not get state. " + resp.Status)
		w.WriteHeader(http.StatusInternalServerError)
		return
	}

	buff, _ := ioutil.ReadAll(resp.Body)
	w.Write(buff)

	str := *(*string)(unsafe.Pointer(&buff))

	fmt.Println("Got a order: ", str)
}

func PostHandler(w http.ResponseWriter, r *http.Request) {
	type Data struct {
		OrderId int `json:"orderId"`
	}

	type Body struct {
		Data Data `json:"data"`
	}

	type State struct {
		Key   string `json:"key"`
		Value Data   `json:"value"`
	}

	bodyBuff, e := ioutil.ReadAll(r.Body)
	if e != nil {
		fmt.Println(e.Error())
		w.WriteHeader(http.StatusBadRequest)
		return
	}

	body := Body{}
	e = json.Unmarshal(bodyBuff, &body)
	if e != nil {
		fmt.Println(e.Error())
		w.WriteHeader(http.StatusBadRequest)
		return
	}

	fmt.Println("Got a new order! Order ID: ", body.Data.OrderId)

	state := State{"order", body.Data}

	payload, e := json.Marshal([]State{state})
	if e != nil {
		fmt.Println(e.Error())
		w.WriteHeader(http.StatusInternalServerError)
		return
	}

	resp, e := http.Post(URL, "application/json", bytes.NewBuffer(payload))
	if resp != nil {
		defer resp.Body.Close()
	}

	if e != nil {
		fmt.Println(e.Error())
		w.WriteHeader(http.StatusInternalServerError)
		return
	}

	if resp.StatusCode/100 != 2 {
		fmt.Println("Could not set state. " + resp.Status)
		w.WriteHeader(http.StatusInternalServerError)
		return
	}

	fmt.Println("Successfully persisted state.")
}
