//Node server which will handle socket io connections

const io = require('socket.io')(8000,{
    cors:{
        origin:'*',
    }
});

const users = {};

io.on('connection',socket=>{
    //if someone joins let others know
    socket.on('new-user-joined', name=>{
        users[socket.id]=name;
        socket.broadcast.emit('user-joined',name);
    });

     //if someone sends messe show to others
    socket.on('send',message=>{
        socket.broadcast.emit('receive',{message:message, name: users[socket.id]})
    });

     //if someone leaves let others know
    socket.on('disconnect',message=>{
        socket.broadcast.emit('left', users[socket.id]);
        delete users[socket.id];
    });

})