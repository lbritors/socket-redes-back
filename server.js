import express from 'express'
import { createServer } from 'node:http'
import { Server } from 'socket.io'
import cors from 'cors'
import { setPostagens, addPostagem } from './public/postagem.js'

const app = express()
const server = createServer(app)
const io = new Server(server, {
  cors: {
    origin: 'https://9000-lbritors-socketredesfro-cisq609mlot.ws-us117.gitpod.io',
    methods: ['GET', 'POST'],
  },
  pingTimeout: 60000,
})

app.use(cors({ origin: 'https://9000-lbritors-socketredesfro-cisq609mlot.ws-us117.gitpod.io' }));

app.get("/", (req, res) => {
  res.send("Server running");
});

io.on('connection', (socket) => {
  console.log("A user connected");
  setPostagens().then((posts)=> {
    socket.emit('setup', posts);
  });

  io.emit('setup', setPostagens());

  socket.on('message', (postagem) => {
    console.log("Message received: ", postagem);
    addPostagem({
      title: postagem.title,
      autor: postagem.autor,
      content: postagem.content,
    })
  })

  socket.on("disconnect", () => {
    console.log("A user disconnected");
  });

})

server.listen(3000, () => {
  console.log('Server is running on port 3000')
})
