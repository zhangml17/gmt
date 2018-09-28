#VERSION 0.0.1
#Author:zhangml17

#基础镜像
FROM tomcat:7.0.77-jre8

#作者
MAINTAINER zhangml17 <meilongyx@163.com>

#定义工作目录(环境变量)
ENV WORK_PATH /usr/local/tomcat/conf

#定义要替换的tomcat-users.xml文件名
ENV USER_CONF_FILE_NAME tomcat-users.xml

#定义要替换的server.xml文件名
ENV SERVER_CONF_FILE_NAME server.xml

#删除原tomcat的tomcat-users.xml文件
RUN rm $WORK_PATH/$USER_CONF_FILE_NAME

#将新的tomcat-users.xml复制到tomcat的conf目录下
COPY ./$USER_CONF_FILE_NAME $WORK_PATH/

#删除原tomcat的server.xml文件
RUN rm $WORK_PATH/$SERVER_CONF_FILE_NAME

#将新的server.xml文件复制到tomcat的conf目录下
COPY ./$SERVER_CONF_FILE_NAME $WORK_PATH/
