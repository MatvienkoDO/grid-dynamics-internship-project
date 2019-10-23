#!/bin/bash

cd frontend
npm install
ng build --prod

cd ../backend
npm install
nest build
