var express = require('express');
var scoket = require('socket.io');


var app = express();
var server = app.listen(8000,"0.0.0.0",function(){
    console.log("Listning to request on port 8000");
});

//Static files
app.use(express.static('public'));


//socket setup
var io = scoket(server);

io.on('connection',function(socket){
    console.log('made socket connection',socket.id);

    socket.on('chat',function(data){
        io.sockets.emit('chat',data);
    });

    // Handle typing event
    socket.on('typing', function(data){
        socket.broadcast.emit('typing', data);
    });

});