#!/bin/bash
echo "-> Iniciando simulator..."
cd simulator
docker-compose down
docker-compose up -d
docker exec -it simulator go run main.go && exit