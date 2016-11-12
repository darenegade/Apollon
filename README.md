# Apollon

## Frontend
__Note for developing on UNIX system__

Please remove the the statement on the build command in the 

```
set NODE_ENV=production browserify -t [ reactify --es6 ] main.js | uglifyjs > compiled.min.js
```
with the statement 

```
NODE_ENV=production browserify -t [ reactify --es6 ] main.js | uglifyjs > compiled.min.js
```
to build the project. 

