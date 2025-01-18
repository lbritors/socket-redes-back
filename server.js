import express from 'express'
import { createServer } from 'node:http'
import { Server } from 'socket.io'
import createPost from './public/postagem.js'
import cors from 'cors'

const app = express()
const server = createServer(app)
const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
})

const bancoPosts = createPost

app.use(cors({ origin: '*' }));

app.get("/", (req, res) => {
  res.send("Server running");
});

io.on('connect', () => {
  console.log("A user connected");
  bancoPosts.setPostagem()

  io.emit('setup', bancoPosts.state)


  io.on('message', (postagem) => {
    console.log("Message received: ", postagem);
    bancoPosts.addPostagem({
      id: postagem.id,
      title: postagem.title,
      autor: postagem.autor,
      content: postagem.editor,
    })

    bancoPosts.setPostagem()

    io.emit('setup', bancoPosts.state)
  })

  socket.on("disconnect", () => {
    console.log("A user disconnected");
  });

})

server.listen(3000, () => {
  console.log('Server is running on port 3000')
})
