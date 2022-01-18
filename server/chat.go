package main

import (
	"context"
	"fmt"
	"log"
	"server/chat"
)

type MyChatServer struct {
}

func (s *MyChatServer) SayHello(ctx context.Context, message *chat.Message) (*chat.Response, error) {
	log.Println("SayHello Called")
	return &chat.Response{Body: fmt.Sprintf("New Message: %s", message.Body)}, nil
}

func (s *MyChatServer) GetDetails(ctx context.Context, message *chat.Details) (*chat.Response, error) {
	log.Println("GetDetails Called")
	return &chat.Response{Body: fmt.Sprintf("Your name is %s and you're %d years old", message.Name, message.Age)}, nil
}
