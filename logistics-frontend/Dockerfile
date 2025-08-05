# Use an official Node.js runtime as a parent image
FROM node:20.19.3

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the Next.js application
RUN npm run build

# Expose the application port
EXPOSE 3030

# Define the command to run the application
CMD ["npm", "start"]
