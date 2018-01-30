package main

import (
	"fmt"
	"net"
	"net/rpc"
	"os"
)

const (
	NODE_PORT        = "8888"
	NODE_ADDRESS     = "localhost"
	NETWORK_PROTOCOL = "tcp"
)

type Message struct {
	address string
	port    string
}

func (message *Message) PassMessage(args string, reply *string) error {
	fmt.Println("rpc method called")
	*reply = args
	return nil
}

func main() {
	var clientAddresses []string

	rpc.Register(new(Message))

	listener, err := net.Listen(NETWORK_PROTOCOL, NODE_ADDRESS+":"+NODE_PORT)
	if err != nil {
		fmt.Println("error in net.listen: ", err.Error)
		os.Exit(1)
	}

	defer listener.Close()

	for {
		conn, err := listener.Accept()
		if err != nil {
			fmt.Println("error in connection: ", err.Error())
			os.Exit(1)
		}

		fmt.Println("ip address of who connected to this server: " + conn.RemoteAddr().String())
		clientAddresses = append(clientAddresses, conn.RemoteAddr().String())
		go rpc.ServeConn(conn)
	}
}
