import express from 'express'
import { createServer } from 'node:http'
import { Server } from 'socket.io'
import cors from 'cors'
import { setPostagens, addPostagem } from './public/postagem.js'

const app = express()
const server = createServer(app)
const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
  pingTimeout: 60000,
})

app.use(cors({ origin: '*' }));

app.get("/", (req, res) => {
  res.send("Server running");
});

io.on('connection', (socket) => {
  console.log("A user connected");
  setPostagens().then((posts)=> {
    socket.emit('setup', posts);
  });

  socket.on('message', (postagem) => {
    console.log("Message received: ", postagem);
    addPostagem({
      title: postagem.title,
      autor: postagem.autor,
      content: postagem.content,
    })

    
    io.emit('setup', setPostagens());
    
  })

  socket.on("disconnect", () => {
    console.log("A user disconnected");
  });

})

server.listen(3000, () => {
  console.log('Server is running on port 3000')
})
