package main

import (
	"log"
	"time"

	"github.com/codeedu/imersaofsfc2-simulator/infra/kafka"
	"github.com/joho/godotenv"
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
