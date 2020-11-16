const app = require('express');
const http  = require('http').createServer(app);
const io = require('socket.io')(http);

io.on('connection',(socket)=>{
    
    console.log('user online');

    socket.on('data',(data)=>{
        socket.broadcast.emit('data',data);
    })


})


const server_port = 8000;

http.listen(server_port,()=>{
    console.log("server started at port: "+server_port)
})