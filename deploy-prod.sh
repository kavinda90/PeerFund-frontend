# deploy.sh
#!/bin/bash
// Build Vue website
yarn build
// Copy Files to S3
aws --region us-east-1 --profile kavinda s3 sync ./dist s3://peerfund-frontend-bucket --delete
// Invalidate Cloudfront
aws configure set preview.cloudfront true && aws cloudfront create-invalidation --distribution-id EMFAYT18T06XD --paths '/*'