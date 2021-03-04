FROM node:14-alpine AS builder
EXPOSE 3000
WORKDIR /app

# Install app dependencies
COPY package.json ./
COPY package-lock.json ./
RUN npm install

# Build app
COPY . ./
CMD ["npm", "start"]

# # New clear docker
# FROM nginx:stable-alpine
# EXPOSE 80
# LABEL maintainer="SphereLab Docker Maintainers <no-reply-developers@spherelab.ru>"

# # Copy files 
# COPY --from=builder /app/build/ /usr/share/nginx/html
# COPY ./nginx.conf /etc/nginx/nginx.conf

# CMD ["nginx", "-g", "daemon off;"]