import {IComment, IUser} from './interfaces'
import {currentUser} from './createComment'
import  {setLocalStorage, getLocalStorage} from './storage'
import { reloadComments } from './init'


const ID =()=>Math.floor(Math.random() * 36 ** 9)




//function format date to string example: "1 month ago"


const commentDefault:IComment = {
  id: ID(),
  content:"",
  createdAt: new Date(),
  score:0,
  user:currentUser,
  replies:[]
}

const newComment=(e:any)=>{
  e.preventDefault();
  const newComment = {...commentDefault,content:e.target.elements.comment.value}
  setLocalStorage('comments',[...getLocalStorage('comments'),newComment])
  reloadComments(getLocalStorage('comments'))
}



export default newComment;