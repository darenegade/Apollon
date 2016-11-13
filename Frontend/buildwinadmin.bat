set NODE_ENV=development
browserify -t [ reactify --es6 ] main_admin.js  > admin.js
watchify -v -d -t [ reactify --es6 ] main_admin.js -o admin.js