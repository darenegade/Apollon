/**
 * This file provided by Facebook is for non-commercial testing and evaluation
 * purposes only. Facebook reserves all rights not expressly granted.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
 * FACEBOOK BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN
 * ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
 * WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

var fs = require('fs');
var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var router = express.Router();


if(process.argv[2]!==undefined){
	app.set('port',  process.argv[2]);
}
else{
	app.set('port',  3000);
}

app.use('/', express.static(path.join(__dirname, '../Frontend')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// Additional middleware which will set headers that we need on each request.
app.use(function(req, res, next) {
    // Set permissive CORS header - this allows this server to be used only as
    // an API server in conjunction with something like webpack-dev-server.
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Disable caching so we'll always get the latest comments.
    res.setHeader('Cache-Control', 'no-cache');
    next();
});

var aSong={id:1232141,name:'supersong',artistName:'Joe Cool',albumName:'blablabla'};

app.get('/current', function (req, res) {
	console.log('allsongs called');
	res.send(aSong);
})

var dummySongList=[
{id:1232141,name:'supersong',artistName:'Joe Cool',albumName:'blablabla',imageUrl:'https://artwork.cdn.247e.com/covers/3922746/256x256'},
{id:1232143,name:'supersong1',artistName:'Joe Cool',albumName:'blablabla',imageUrl:'https://artwork.cdn.247e.com/covers/3922746/256x256'},
{id:1232144,name:'supersong2',artistName:'Joe Cool',albumName:'blablabla',imageUrl:'https://artwork.cdn.247e.com/covers/3922746/256x256'},
{id:1232145,name:'supersong3',artistName:'Joe Cool',albumName:'blablabla',imageUrl:'https://artwork.cdn.247e.com/covers/3922046/256x256'},
{id:1232146,name:'supersong4',artistName:'Joe Cool',albumName:'blablabla',imageUrl:'https://artwork.cdn.247e.com/covers/3922746/256x256'},
{id:1232147,name:'supersong5',artistName:'Joe Cool',albumName:'blablabla',imageUrl:'https://artwork.cdn.247e.com/covers/3922746/256x256'},
{id:1232148,name:'supersong6',artistName:'Joe Cool',albumName:'blablabla',imageUrl:'https://artwork.cdn.247e.com/covers/3922746/256x256'},
{id:1232149,name:'supersong7',artistName:'Joe Cool',albumName:'blablabla',imageUrl:'https://artwork.cdn.247e.com/covers/3922746/256x256'},
{id:1232150,name:'supersong8',artistName:'Joe Cool',albumName:'blablabla',imageUrl:'https://artwork.cdn.247e.com/covers/3922646/256x256'}
];


app.get('/playlist', function (req, res) {
	console.log('allsongs called');
	res.send(dummySongList);
})



app.listen(app.get('port'), function() {
  console.log('Server started: http://localhost:' + app.get('port') + '/');
});
