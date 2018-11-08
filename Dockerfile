# FROM debian:buster
# WORKDIR /app
# COPY . /app




# ENTRYPOINT ["/bin/bash", "run.sh"]

FROM mhart/alpine-node:10

WORKDIR /app
COPY . .

# RUN apt-get update
# RUN apt-get install jq -y 
# RUN apt-get install bsdmainutils -y
# RUN apt-get install curl -y

RUN chmod +x run.sh

RUN npm install --prod

EXPOSE 3000
CMD ["node", "index.js"]
