//Make connection
var socket = io.connect('http://192.168.29.75:8000');

//Query dom
var message = document.getElementById('message');
var handle = document.getElementById('handle');
var btn = document.getElementById('send');
var output  = document.getElementById('output'),
feedback = document.getElementById('feedback')


//Emits event

btn.addEventListener('click',function(){
    socket.emit('chat',{
        message:message.value,
        handle:handle.value
    });
});

message.addEventListener('keypress',function(){
    socket.emit('typing',handle.value);
});

//Listen for event

socket.on('chat',function(data){
    feedback.innerHTML ="";
    output.innerHTML += '<p><strong>' + data.handle + ":</strong>" + data.message + "</p>";  
});

socket.on('typing',function(data){
    feedback.innerHTML = "<p><em>" + data + "is typing a message...</em></p>"
});
