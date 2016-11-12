set NODE_ENV=production

browserify -t [ reactify --es6 ] main.js  > compiled.js

watchify -v -d -t [ reactify --es6 ] main.js -o compiled.js