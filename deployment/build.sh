#!/bin/bash

cd frontend
npm install
npm install --only=dev
ng build --prod

cd ../backend
npm install
npm install --only=dev
nest build
