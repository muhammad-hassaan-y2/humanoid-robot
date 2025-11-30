# Deployment script for GitHub Pages
# Stop on errors
$ErrorActionPreference = "Stop"

Write-Host "Building the project..." -ForegroundColor Green
npm run build

Write-Host "Navigating to build directory..." -ForegroundColor Green
Set-Location build

# Create .nojekyll file to bypass Jekyll processing
Write-Host "Creating .nojekyll file..." -ForegroundColor Green
"" | Out-File -FilePath ".nojekyll" -Encoding ASCII

# Initialize git repository
Write-Host "Initializing git repository..." -ForegroundColor Green
git init
git checkout -b main

# Add all files
Write-Host "Adding files to git..." -ForegroundColor Green
git add -A

# Commit files
Write-Host "Committing files..." -ForegroundColor Green
git commit -m "deploy to GitHub Pages"

# Push to GitHub Pages
# Replace YOUR_USERNAME with your actual GitHub username
Write-Host "Pushing to GitHub Pages..." -ForegroundColor Green
git push -f git@github.com:muhammad-hassaan-y2/humanoid-guide.git main:gh-pages

# Go back to original directory
Set-Location ..

Write-Host "Deployment complete!" -ForegroundColor Green