#!/bin/bash

# Get to node directory
cd /Users/Toupin/Developer/0-penh-2023/penh-node-ts

# Set JWT private key
export penh_jwtPrivateKey=1234

# Set upload path
export penh_upLoadPath=/Users/Toupin/Developer/0-penh-2023/penh-volume/public

# Set DBHost
export penh_dbHost=localhost

# Set picture path
export penh_pictureUrl=http://localhost:3000/api/pictureServer

# Set api key
export penh_apiKeyChatgpt=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

# Run Jest Test
npm test

# Function to run when Ctrl+C is pressed
cleanup() {
  echo "Cleaning up and exiting..."
  # Add any cleanup tasks here if needed
  exit 0
}

# Trap Ctrl+C (SIGINT) and run cleanup function
trap cleanup INT

# Start server using nodemon
nodemon index.ts
