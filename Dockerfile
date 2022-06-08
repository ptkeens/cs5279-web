FROM node:16
RUN mkdir -p /opt/app
WORKDIR /opt/app
COPY package*.json ./
RUN npm ci
COPY . ./
CMD ["npm", "start"]