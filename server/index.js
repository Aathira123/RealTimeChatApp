const express=require('express');
const socketio=require('socket.io');
const cors=require('cors');
const http=require('http');
const router=require('./router');
const PORT=process.env.PORT || 5000
const app=express(); //create express middleware
const server=http.createServer(app); //Pass express to http server
const io=socketio(server); // pass server to socket instance
app.use('/',router)
app.use(cors());
const {addUser,removeUser,getUser, getUsersInRoom} =require('./users')
io.on('connection',(socket)=>{
    
console.log(`We have a new connection from ${socket.id}`);
socket.on('join',({name,room},callback)=>{
    const {error,user}=addUser({id:socket.id,name,room});
    console.log(user)
    if(error) return callback(error)
    socket.join(user.room);
    socket.emit('message',{user:'admin',text:`${user.name} Welcome to the room ${user.room}`});
    socket.to(user.room).emit('message',{user:'admin',text:`${user.name} has joined the room`});
    io.to(user.room).emit('roomData',{room:user.room,users:getUsersInRoom(user.room)})
    callback();
})
socket.on('sendMessage',(message,callback)=>{
    const user=getUser(socket.id)
    
    io.to(user.room).emit('message',{user:user.name,text:message})
    io.to(user.room).emit('roomData',{room:user.room,users:getUsersInRoom(user.room)})
callback();
})
socket.on('disconnect',()=>{
    const user=removeUser(socket.id)
    if(user){
        io.to(user.room).emit("message",{user:'admin',text:`${user.name} had left`})
    }
})
})




server.listen(PORT,()=>console.log(`Server has started on port ${PORT}`)
)


