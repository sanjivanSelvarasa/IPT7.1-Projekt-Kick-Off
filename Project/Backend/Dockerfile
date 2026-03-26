FROM node:20-alpine

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci --omit=dev

COPY controllers ./controllers
COPY services ./services
COPY routes ./routes
COPY models ./models
COPY middleware ./middleware
COPY utils ./utils
COPY app.js ./