FROM alpine:3.19

RUN apk --no-cache add sqlite

WORKDIR /db

ENTRYPOINT ["/bin/sh"]

CMD [ "sqlite3", "initial.db" ]
