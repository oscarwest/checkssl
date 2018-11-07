FROM debian:buster
WORKDIR /app
COPY . /app


RUN apt-get update
RUN apt-get install bsdmainutils -y
RUN apt-get install curl -y

RUN chmod +x run.sh

ENTRYPOINT ["/bin/bash", "run.sh"]
# RUN curl https://cdn.collector.se/commoninfrastructure/domains.txt > domains.txt
# RUN ./checkssl -f domains.txt
