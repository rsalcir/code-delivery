#!/bin/bash
echo "-> Iniciando servicos..."
cd services
docker-compose down
docker-compose up -d
echo "-> Iniciando simulator..."
cd ..
cd simulator
docker-compose down
docker-compose up -d
docker exec -it simulator go run main.go && exit