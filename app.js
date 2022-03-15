//For Camera
var fs = require('fs'); //file system
const options = {
	key: fs.readFileSync('./keys/key.pem'),
	cert: fs.readFileSync('./keys/cert.pem')
};

// Server Setting
var express = require('express');
var app = express();
var server = require('https').Server(options, app);
server.listen(8080, function(){
    console.log("Server Started at :8080");
});

// var server = require('http').createServer(app);
// 	server.listen(8080, function(){
// });

// Render
app.get('/',function(req,res){
   res.render('index')
});

app.get('/mobile',function(req,res){
   res.render('mobile')
});

// Views
app.set('views', './views');
app.set('view engine', 'ejs');
app.use(express.static(__dirname));

// Socket
var io = require('socket.io').listen(server);

io.on('connection', function(socket){
  console.log('client is connected')
  socket.on('FrontImage', function(data){
    io.emit('FrontImage', data)
  });
});
