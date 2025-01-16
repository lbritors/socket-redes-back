export default function createPost() {
    const state = {
      posts:{}
    }
  
  
  
    function setPlataforma(newState){
      Object.assign(state, newState)
    }
  
    function addPost(command){
      const postTitulo = command.titulo
      const postAutor = command.autor
      const post = command.post
  
      state.posts[postAutor] = {
        titulo: postTitulo,
        postagem: post
      }
  
    }
  
    return{
      addPost,
      state,
      setPlataforma
    }
  }
  