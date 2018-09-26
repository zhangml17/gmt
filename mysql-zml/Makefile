SHELL=/bin/bash

all: pull rename delete run

pull:
	@docker pull mysql:5.7
rename:
	@docker tag docker.io/mysql:5.7 mysql:5.7
delete:
	@docker rmi docker.io/mysql:5.7
#启动一个mysql容器，并初始化root用户的密码为root
run:
	@docker run -p 13306:3306 --name mysql-0 -e MYSQL_ROOT_PASSWORD=root -d mysql:5.7
