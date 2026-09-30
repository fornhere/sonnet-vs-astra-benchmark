#!/bin/sh
cd "$(dirname "$0")/.."
npx esbuild src/main.js --bundle --minify --format=iife --target=es2020 --outfile=dist/app.js --log-level=warning
