#!/bin/bash

# HowTo Website - GitHub Deployment Script
# This script pushes the code to your existing HowTo repository

echo "🚀 Deploying HowTo Website to GitHub..."

# Check if git is initialized
if [ ! -d ".git" ]; then
    echo "📦 Initializing git repository..."
    git init
    git branch -m main
fi

# Configure git (you can change these)
git config user.email "you@example.com"
git config user.name "Your Name"

# Add all files
echo "📁 Adding files to git..."
git add .

# Commit
echo "💾 Creating commit..."
git commit -m "Initial commit - HowTo Tutorial Website

Features:
- Multi-page navigation with React Router
- Search functionality with filters
- Category pages with sorting
- Admin dashboard (username: codeByLex, password: LexHowTo2024!)
- Feedback system for users
- 4 ad network integrations (Google AdSense, Media.net, PropellerAds, Adsterra)
- Responsive design with dark theme
- Article bookmarking and social sharing"

# Add remote (replace with your actual repo URL)
echo "🔗 Adding remote repository..."
git remote remove origin 2>/dev/null
git remote add origin https://github.com/lexxakaatune/HowTo.git

# Push to GitHub
echo "📤 Pushing to GitHub..."
git push -u origin main --force

echo "✅ Done! Your code has been pushed to https://github.com/lexxakaatune/HowTo"
echo ""
echo "Next steps:"
echo "1. Go to https://github.com/lexxakaatune/HowTo/settings/pages"
echo "2. Under 'Source', select 'GitHub Actions'"
echo "3. Your site will be live at: https://lexxakaatune.github.io/HowTo/"
