import prisma from './db.js'

export async function setPostagens() {
  return await prisma.resumo.findMany()
}

export  async function addPostagem(command) {
    return await prisma.resumo.create({
      data: {
        id: command.id,
        autor: command.autor,
        titulo: command.title,
        conteudo: command.content,
    },
  })
}

 

