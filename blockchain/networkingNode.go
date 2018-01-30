package main

import (
	"fmt"
	"net/rpc"
	"os"
)

func main() {
	connectToRpcServer()
}

func connectToRpcServer() {
	conn, err := rpc.Dial("tcp", "localhost:8888")

	defer conn.Close()

	if err != nil {
		fmt.Println("main dial error")
		os.Exit(1)
	}

	args := "success"
	var reply string

	err = conn.Call("Message.PassMessage", args, &reply)
	if err != nil {
		fmt.Println("error in rpc: ", err.Error)
	}
	fmt.Println("response from rpc call: " + reply)
}
