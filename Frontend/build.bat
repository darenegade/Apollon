set NODE_ENV=production 
browserify -t [ reactify --es6 ] main.js  > compiled.js