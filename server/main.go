package main

import (
	"fmt"
	"google.golang.org/grpc"
	"log"
	"net"
	"server/chat"
)

func main() {
	listener, err := net.Listen("tcp", fmt.Sprintf(":%d", 9000))
	if err != nil {
		log.Fatal(err)
	}

	chatServer := MyChatServer{}
	grpcServer := grpc.NewServer()
	chat.RegisterChatServiceServer(grpcServer, &chatServer)
	if err := grpcServer.Serve(listener); err != nil {
		log.Fatal(err)
	}
}
