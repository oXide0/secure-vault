#!/bin/bash

# Exit immediately if a command exits with a non-zero status.
set -e

# Echo each command before executing
set -x

# Define directories
FRONTEND_DIR="../frontend"
CDK_DIR="../cdk"

# Build frontend
echo "Building frontend..."
cd $FRONTEND_DIR
npm install          # Install frontend dependencies
npm run build        # Build the frontend (assuming your package.json has a build script)
cd ..

# Build and deploy CDK stacks
echo "Deploying AWS infrastructure..."
cd $CDK_DIR
npm install          # Install CDK dependencies
npm run build        # Compile TypeScript to JavaScript
# cdk synth            # Synthesize CloudFormation templates (optional, for checking)
# cdk deploy           # Deploy the CDK stacks to AWS
cd ..

# Optional: Deploy frontend to S3/CloudFront
# echo "Deploying frontend..."
# aws s3 sync $FRONTEND_DIR/build s3://your-s3-bucket-name --delete
# aws cloudfront create-invalidation --distribution-id your-distribution-id --paths "/*"

echo "Build completed successfully."
# echo "Build and deployment completed successfully."
