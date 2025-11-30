#!/usr/bin/env sh

# abort on errors
set -e

# build
npm run build

# navigate into the build output directory
cd build

# place .nojekyll to bypass Jekyll processing
echo > .nojekyll

# if you are deploying to a custom domain
# echo 'www.example.com' > CNAME

git init
git checkout -b main
git add -A
git commit -m 'deploy to GitHub Pages'

# if you are deploying to https://<username>.github.io/<repo>
git push -f git@github.com:muhammad-hassaan-y2/humanoid-guide.git main:gh-pages

cd -