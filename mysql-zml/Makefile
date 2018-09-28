SHELL=/bin/bash
TAG=0.0.1
IMAGE_NAME=mysql-web
IMAGE=${IMAGE_NAME}:${TAG}
HOST_PORT=13306
PORT=3306
CONTAINER_NAME=mysql-0
ROOT_PASSWORD=root

all: build run 

build:
	@docker build -t ${IMAGE} .

#pull:
#	@docker pull mysql:5.7
#rename:
#	@docker tag docker.io/mysql:5.7 mysql:5.7
#delete:
#	@docker rmi docker.io/mysql:5.7

#启动一个mysql容器，并初始化root用户的密码为root
run:
	@docker run -p ${HOST_PORT}:${PORT} --name ${CONTAINER_NAME} -e MYSQL_ROOT_PASSWORD=${ROOT_PASSWORD} -d ${IMAGE}
