#!/bin/bash

set -o pipefail

if [ ! -d "build" ] || [ "$1" == "--with-build" ];
then
    echo "Building frontend..."
    yarn build
    yarn --cwd ./documentation build
fi

rm -rf deployment/www
cp -r build deployment/www
cp -r documentation/build deployment/www/docs
cd deployment

# Deploy
gcloud app deploy --project visualtez
