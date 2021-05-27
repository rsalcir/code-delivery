#!/bin/bash
echo "-> Iniciando servicos..."
cd services
docker-compose down
docker-compose up -d