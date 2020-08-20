FROM node:10-buster AS builder
WORKDIR /app
COPY cmms/package.json cmms/package-lock.json /app/
RUN npm install
COPY cmms/ /app/
RUN npm run build

FROM nginx:latest
COPY --from=builder /app/dist/ /var/www/html/
COPY nginx.conf /etc/nginx/nginx.conf
EXPOSE 80 8080
