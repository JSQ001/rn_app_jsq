package main

import (
	"../from_url"
	"fmt"
	"log"
	"net/http"
)
func sayHi(w http.ResponseWriter, r *http.Request) {
	fmt.Fprint(w,"Hi")
}

func main() {
	content:=from_url.Crawler_url();

	http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request){
		fmt.Println(r)
		fmt.Println(r.Header)
		fmt.Println(r.URL)
		//fmt.Fprint(w, "Hello world")
		fmt.Fprint(w, content)
	})
	http.HandleFunc("/content", func(w http.ResponseWriter, r *http.Request){
		fmt.Fprint(w, content)
	})

	http.HandleFunc("/sayHi", sayHi)
	log.Fatal(http.ListenAndServe("localhost:10000",nil ))
}
