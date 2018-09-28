FROM mysql:5.7

#将容器的编码改为UTF-8
ENV  LANG C.UTF-8

RUN mkdir -p /opt

#将Dockerfile文件所在目录的thpcloud.sql文件拷贝进容器的/opt目录
ADD thpcloud.sql /opt
