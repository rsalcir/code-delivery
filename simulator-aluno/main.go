package main

import (
	"log"
	"time"

	"github.com/joho/godotenv"
	"github.com/rsalcir/code-delivery/infra/kafka"
)

func init() {
	err := godotenv.Load()
	if err != nil {
		log.Fatal("error loading .env file")
	}
}

func main() {
	producer := kafka.NewKafkaProducer()
	log.Println("started...")
	for {
		_ = 1
		time.Sleep(1 * time.Second)
		kafka.Publish("ola terraquios...", "readtest", producer)
	}
}
