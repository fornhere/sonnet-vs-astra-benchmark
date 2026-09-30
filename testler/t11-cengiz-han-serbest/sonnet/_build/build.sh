npx esbuild src/main.js --bundle --minify --format=iife --target=es2020 --outfile=../app.js --log-level=warning && ls -la ../app.js
