FROM node:10-buster
WORKDIR /app
COPY cmms/package.json cmms/package-lock.json /app/
RUN npm install
COPY cmms/ /app/
CMD ["npm", "run", "serve"]
