FROM node:20-alpine

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci --omit=dev

COPY 0_routes ./0_routes
COPY 1_middleware ./1_middleware
COPY 2_controllers ./2_controllers
COPY 3_services ./3_services
COPY 4_models ./4_models
COPY 5_utils ./5_utils
COPY app.js ./

EXPOSE 3000