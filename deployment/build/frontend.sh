#!/bin/bash

cd frontend

#
# Flag --production=false is needed for using
#   ng-cli local for current package
#
npm install --production=false

npm run build:prod
