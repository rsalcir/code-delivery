#!/bin/bash
echo "-> Iniciando api..."
cd api
docker-compose down
docker-compose up