#!/bin/bash

# Check if a commit message was provided
if [ -z "$1" ]; then
  echo "Usage: ./deploy.sh \"Commit message\""
  exit 1
fi

# Add all changes
git add .

# Commit with the provided message
git commit -m "$1"

# Push to the current branch
git push

echo "Changes pushed to GitHub!"
