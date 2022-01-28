import { currentUser } from './createComment'
import { setLocalStorage, getLocalStorage, addLocalStorage, updateLocalStorage } from './storage'
import { reloadComments } from './init'



const changeScore = (e: any) => {
  const id = e.target.closest('.comment__item').dataset.id
  const dataStorage = getLocalStorage('comments')
  const comment = dataStorage.find((comment: any) => comment.id == id)
  if (!comment) {
    dataStorage.forEach((comment: any) => {
      if (comment.replies) {
        const reply = comment.replies.find((reply: any) => reply.id == id)
        if (reply) {
          reply.score = e.target.classList.contains('img__minus') ? reply.score - 1 : reply.score + 1
          updateLocalStorage('comments', comment)
          reloadComments(getLocalStorage('comments'))
        }
      }
    })
  } else {
    comment.score = e.target.classList.contains('img__minus') ? comment.score - 1 : comment.score + 1
    updateLocalStorage('comments', comment)
    reloadComments(getLocalStorage('comments'))
  }
}



export default changeScore