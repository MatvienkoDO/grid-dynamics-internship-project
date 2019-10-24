#!/bin/bash

cd frontend
npm install
npm run build:prod
npx serve dist/frontend --single --no-clipboard -l $PORT
