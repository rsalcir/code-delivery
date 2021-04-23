package kafka

import (
	"encoding/json"
	"log"
	"os"
	"time"

	ckafka "github.com/confluentinc/confluent-kafka-go/kafka"
	"github.com/rsalcir/code-delivery/application/route"
	"github.com/rsalcir/code-delivery/infra/kafka"
)

//{"clientId":"1", "routeId":"1"}
//{"clientId":"2", "routeId":"2"}
//{"clientId":"3", "routeId":"3"}
func Produce(msg *ckafka.Message) {
	producer := kafka.NewKafkaProducer()
	route := route.NewRoute()
	json.Unmarshal(msg.Value, &route)
	route.LoadPositions()

	positions, error := route.ExportJsonPositions()

	if error != nil {
		log.Println(error.Error())
	}

	for _, position := range positions {
		kafka.Publish(position, os.Getenv("KafkaProduceTopic"), producer)
		time.Sleep(time.Millisecond * 500)
	}
}
