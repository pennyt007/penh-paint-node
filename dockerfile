# Use an official Node.js runtime as the base image
FROM --platform=linux/amd64 node:14.15

# Set the working directory inside the container
WORKDIR /penh-node-ts

# Set environment variables - moved to docker-compose
# ENV penh_jwtPrivateKey=1234
# ENV penh_upLoadPath=/public
# ENV penh_pictureUrl=http://192.168.1.76:3000/api/pictureServer

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install project dependencies
RUN npm install

# Copy the rest of the application code to the container
COPY . .

# Build TypeScript source code
RUN npm run-script build

# Expose a port (if your application listens on a specific port)
EXPOSE 3000

# Define the command to start your application (modify as needed)
CMD ["npm", "start"]
