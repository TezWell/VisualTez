#!/bin/bash

set -o pipefail

if [ ! -d "build" ] || [ "$1" != "--no-build" ];
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
gcloud --account=tezwell@visualtez.iam.gserviceaccount.com app deploy --project visualtez
