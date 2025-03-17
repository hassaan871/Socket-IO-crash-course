import express from "express";
import { Server } from "http";
import path from "path";
import { fileURLToPath } from "url";
import { Server as SocketIOServer } from "socket.io";

const app = express();
const http = Server(app);

const io = new SocketIOServer(http);

const PORT = process.env.PORT || 7000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const options = {
    root: path.join(__dirname)
}

app.get('/', (req, res) => {
    return res.sendFile("index.html", options);
});

let users = 0;

io.on('connection', (socket) => {
    console.log(`a user connected`);

    users++;
    // io.sockets.emit('broadcast', { message: `Connected Users: ${users}` });
    socket.emit('newUserConnect', {message: 'Hii, user new user'});
    socket.broadcast.emit('newUserConnect', {message: `Connected Users: ${users}`});

    /*
        setTimeout(()=>{
            // socket.send("Sent message from server side by prereserved events.");
            socket.emit('myCustomEvent', {
                message: "this is my custom event message from server side"
            });
        }, 3000);
    
        socket.on('myCustomEventFromClient', ({message})=>{
            console.log(message);
            
        });
    */

    socket.on('disconnect', () => {
        console.log(`a user disconnected`);

        users--;
        // io.sockets.emit('broadcast', { message: `Connected Users: ${users}` });
        socket.emit('newUserConnect', {message: 'Hii, user new user'});
        socket.broadcast.emit('newUserConnect', {message: `Connected Users: ${users}`});

    });
});

http.listen(PORT, () => {
    console.log(`server up and running on port: ${PORT}`);
});