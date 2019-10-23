#!/bin/bash

cd frontend
npm install
npm install --only=dev
npx ng build --prod

cd ../backend
npm install
npm install --only=dev
npx nest build
