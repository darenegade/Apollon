set NODE_ENV=development
browserify -t [ reactify --es6 ] main.js  > compiled.js