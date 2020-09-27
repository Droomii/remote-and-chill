var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

var moviePath = process.argv[2];
var subtitlePath = process.argv[3];
app.get('/video', (req, res) =>{
	res.sendFile(moviePath);
});

app.get('/subtitle', (req, res) =>{
	res.sendFile(subtitlePath);
});


io.on('connection', (socket) => {
	socket.on('chat message', (msg) => {
		console.log('message: ' + msg);
		io.emit('chat message', msg);
	});

	socket.on('pause', (nick) =>{
		console.log('paused by ' + nick);
		io.emit('pause', nick);
	});
	
	socket.on('play', (playInfo) =>{
		console.log('played by ' + playInfo.nick);
		io.emit('play', playInfo);
	});
	
	socket.on('seek', (playInfo) =>{
		console.log('seeked by ' + playInfo.nick);
		io.emit('seek', playInfo);
	});
	
});
http.listen(3000, () => {
  console.log('listening on *:3000');
});