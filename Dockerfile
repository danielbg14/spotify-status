# Simple Dockerfile for the Spotify now-playing web service
# Build a small runtime image using the official Node.js base image
FROM node:20-alpine

WORKDIR /app

# Install dependencies first (leveraging build cache)
COPY package*.json ./
RUN npm install --production

# Copy app sources
COPY public ./public
COPY server.js ./

# Default port
ENV PORT=3000
EXPOSE 3000

CMD ["npm", "start"]