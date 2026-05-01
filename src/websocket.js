import {Server, Socket} from 'socket.io';
import {verifyAccessToken} from '../src/utils/jwt.js';

let io;

export const initSocketServer = (server) => {
    io = new Server(server, {
        cors: {
             origin:[
                    "http://localhost:5173"
                    ]
        }
    });
    
    io.use((socket, next) => {
        const token = socket.handshake?.auth?.token??null;
        if (!token) {
            console.log("No accessToken ");
            return next(new Error(""));

        }

        try {
            const decode = verifyAccessToken(token);
            socket.data.user = decode;
            return next();

        } catch (err) {
            console.log(err.message);
            return next(new Error(err.message))
        }


    });
    
    io.on("connection", (socket) => {
        console.log("Client connect :", socket.id, " User name: ", socket.data.user.user_name);

       

        socket.on("publicchat:send", (data)=>{
            console.log(socket.data.user.user_name," send a message");

            io.emit("publicchat:received", {
                type: "received",
                sender: socket.data.user.user_name,
                message: data.message
            })
        });



        socket.on("disconnect", (reason) => {
            console.log("Client disconnect: ", socket.data.user.user_name, reason);
        })
       

    });

    
    return io;
}
