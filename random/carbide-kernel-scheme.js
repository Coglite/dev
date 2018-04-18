//

var WebSocketServer = require('ws').Server, 
	spawn = require('child_process').spawn,
	wss = new WebSocketServer({ port: 1947 });

console.log('listening on port 1947')

var children  = [];
wss.on('connection', function connection(ws) {
	var scheme = spawn('mit-scheme');
	children.push(scheme)

	scheme.on('close', function(code, signal){
		console.log('scheme closed', signal)
	});

	scheme.stdout.on('data', (data) => {
		process.stdout.write(data.toString())
		ws.send(data.toString());
	});


	ws.on('message', function incoming(message) {
		// cleanse the palette
		scheme.kill("SIGINT")
		scheme.kill("SIGINT")

		scheme.stdin.write(message);
	});

	ws.on('close', function(){
		scheme.kill()
		children.splice(children.indexOf(ws), 1)
	})
});

function cleanExit() { process.exit() }

process.on('SIGINT', cleanExit); // catch ctrl-c
process.on('SIGTERM', cleanExit); // catch kill

process.on('exit', function() {
	
	console.log('killing', children.length, 'child processes');

	children.forEach(function(){
		child.kill()
	});
})