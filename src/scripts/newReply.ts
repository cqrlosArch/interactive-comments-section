import {IReply} from './interfaces'
import {currentUser} from './createComment'
import  {setLocalStorage, getLocalStorage,addLocalStorage, updateLocalStorage} from './storage'
import { reloadComments } from './init'

const ID =()=>Math.floor(Math.random() * 36 ** 9)

const replyDefault:IReply = {
  id: ID(),
  content:"",
  createdAt: new Date(),
  score:0,
  user:currentUser,
  replyingTo: ""
}

const newReply=(e:any)=>{
  const id = e.target.parentNode.dataset.id
  const newReply = {...replyDefault,content:e.target.elements.comment.value}
  e.target.reset()
  const dataStorage = getLocalStorage('comments')
  const comment = dataStorage.find((comment:any)=>comment.id == id)
  comment.replies.push(newReply)
  console.log(comment)
  updateLocalStorage('comments',comment)
  reloadComments(getLocalStorage('comments'))


 
}

export default newReply