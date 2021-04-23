#!/bin/bash
cd services
winpty docker exec -it apache-kafka_kafka_1 kafka-console-producer --bootstrap-server=kafka:9092 --topic=route.new-direction
