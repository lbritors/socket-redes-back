import express from "express";
import { createServer } from "node:http";
import { Server } from "socket.io";
import cors from "cors";
import http from 'http'
import createPost from './public/postagem.js';

const app = express();
const server = createServer(app);
const io = new Server(server);

/*
app.use(cors({ origin: "http://localhost:9000" }));



app.get("/", (req, res) => {
  res.send("Hello World");
});
*/

//Pasta com arquivos estáticos para serem disponibilizados de forma publica
app.use(express.static('public'))

const post = createPost()
post.addPost({titulo: 'Teste1', autor: 'Rafael', post: "Esse é o primeiro teste!"})
post.addPost({titulo: 'Teste2', autor: 'Larissa', post: "Esse é o segundo teste!"})
post.addPost({titulo: 'Teste3', autor: 'Henrique', post: "Esse é o terceiro teste!"})

console.log(post.state)

io.on("connection", (socket) => {
  const userId = socket.id
  console.log('> User connected on Server with id: ', userId)

  io.emit('setup', post.state)
})

/*
io.on("connection", (socket) => {
  console.log("A user connected");
  socket.on("message", (data) => {
    console.log("Message received: ", data);
  });

  socket.emit("welcome", { message: "Welcome to the Websocket server!" });

  socket.on("disconnect", () => {
    console.log("A user disconnected");
  });
});
*/
//Expondo a porta 3000 do servidor HTTP
server.listen(3000, () => {
  console.log("Server is running on port 3000");
});
