FROM node:8.12.0-slim

WORKDIR /app
COPY . .

RUN npm install --prod

EXPOSE 3000
CMD npm run debug