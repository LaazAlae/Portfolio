#!/bin/bash

echo "Building portfolio Docker image..."
docker build -t portfolio .

echo "Build complete! To run:"
echo "docker run -p 80:80 portfolio"