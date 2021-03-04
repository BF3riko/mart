FROM node:14-alpine AS builder
WORKDIR /app

# Install app dependencies
COPY package.json ./
COPY package-lock.json ./
RUN npm install

# Build app
COPY . ./
RUN npm run build

# New clear docker
FROM nginx:stable-alpine
EXPOSE 80
LABEL maintainer="SphereLab Docker Maintainers <no-reply-developers@spherelab.ru>"

# Copy files 
COPY --chown=1 --from=builder /app/build/. /usr/share/nginx/html
COPY --chown=1 ./nginx.conf /etc/nginx/nginx.conf

CMD ["nginx", "-g", "daemon off;"]