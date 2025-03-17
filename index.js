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

io.on('connection', (socket)=>{
    console.log(`a user connected`);

    socket.on('disconnect', ()=>{
        console.log(`a user disconnected`);
        
    });
});

http.listen(PORT, () => {
    console.log(`server up and running on port: ${PORT}`);
});