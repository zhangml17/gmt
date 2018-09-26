SHELL=/bin/bash
DOCKER_REGISTRY=10.254.0.54:5000
PORT=8080
HOST_PORT:8089
NAME=bj-test
TAG=v1
IMAGE=${DOCKER_REGISTRY}/${NAME}:${TAG}
CONTAINER_NAME=${NAME}


all:build push deploy
build:
	@docker build -t ${IMAGE} ./tomcat
push:
	@docker push ${IMAGE}
run:
	@docker run -d -p ${HOST_PORT}:${PORT} --name ${CONTAINER_NAME} ${IMAGE} 
deploy:
	
