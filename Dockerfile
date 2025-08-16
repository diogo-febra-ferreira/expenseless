FROM node:22-alpine

# Create app directory
WORKDIR /usr/src/app

# Install dependencies first (for better caching)
COPY package*.json ./
RUN npm install

# Copy app source (but you’ll override with volume mount in dev)
COPY . .

# Expose app port
EXPOSE 3000

# Default command
CMD [ "npm", "run", "dev" ]