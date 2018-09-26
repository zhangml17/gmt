SHELL=/bin/bash

all: pull rename delete run
#从仓库拉取redis镜像
pull:
	@docker pull redis:3.2
#将镜像重命名
rename:
	@docker tag docker.io/redis:3.2 redis:3.2
#删除旧镜像
delete:
	@docker rmi docker.io/redis:3.2
#前台启动一个容器
run:
	@docker run -p 16379:6379 --name redis-0 redis:3.2
