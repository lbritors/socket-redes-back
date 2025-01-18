import prisma from './db.js'

export default function createPost() {
  const state = {
    posts: {},
  }

  async function setPostagens() {
    const newState = await prisma.resumo.findMany()
    Object.assing(state, newState)
  }

  async function addPostagem(command) {
    return await prisma.resumo.create({
      data: {
        id: command.id,
        autor: command.autor,
        titulo: command.title,
        conteudo: command.content,
      },
    })
  }

  return {
    addPostagem,
    state,
    setPostagens,
  }
}
