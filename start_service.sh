#!/bin/bash
echo "-> Iniciando servicos..."
sudo sysctl -w vm.max_map_count=262144
cd services
docker-compose down
docker-compose up -d
