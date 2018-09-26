FROM redis:3.2

RUN mkdir -p /workspace
#将redis放在/usr/local/etc/ 目录下
RUN mkdir -p /usr/local/etc/redis

ADD ./scripts/entrypoint.active-backup.sh /workspace/
ADD ./manifest/redis.conf /usr/local/etc/redis
