const express = require("express");
const app = express();
const path = require('path');
const restRouter = require('./routes/rest');
const indexRouter= require('./routes/index');

var http = require('http');
var socketIO = require('socket.io');
var io = socketIO();
var editorSocketService = require('./services/editorSocketService')(io); // import the function defined in editorSocoketService.js

const mongoose = require ('mongoose'); // the tool used by backend to connect to mongodb
mongoose.connect("mongodb://wendy:0131dog@ds219055.mlab.com:19055/oj_system")


// app.get('/', (req, res) => res.send('Hello Express World!') ); 
app.use('/api/v1', restRouter);
app.use(express.static(path.join(__dirname, '../public'))); // where the static files located and they will run on browsers


//app.listen(3000);

const server = http.createServer(app); 
io.attach(server); // get server from above, so that socket io can be attached to the server
server.listen(3000);
server.on('listening', function(){
	console.log('App listening on port 3000')
})

app.use((req, res) => {
	res.sendFile('index.html', {root: path.join(__dirname, '../public')}); // whenever refresh the page or the url the server doesn't know, send out the static file
});

