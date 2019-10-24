#!/bin/bash

cd frontend
npm install
npm install --only=dev
npm run build:prod

cd ../backend
npm install
npm install --only=dev
npm run build
