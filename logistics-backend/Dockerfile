# Use the official Node.js image.
FROM node:18

# Create and change to the app directory.
WORKDIR /app

# Copy application dependency manifests to the container image.
COPY package*.json ./

# Install dependencies.
RUN npm install

# Copy the local code to the container image.
COPY . .

# Build the application
RUN npm run build

# Expose the port the app runs on.
EXPOSE 8080

# Run the web service on container startup.
CMD [ "npm", "start" ]
