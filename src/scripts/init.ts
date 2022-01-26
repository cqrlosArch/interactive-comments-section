import { IComment } from './interfaces'
import data from '../assets/data.json';
const list = document.querySelector('.comments__list');
import newComment from './newComment';

import { getLocalStorage, setLocalStorage, removeLocalStorage, clearLocalStorage } from './storage';
import createComment from './createComment'
import createReplies from './createReplies'
import createForm from './createForm';
import newReply from './newReply';


const init = () => {
  let dataStorage
  if (getLocalStorage('comments')) {
    dataStorage = getLocalStorage('comments');
  } else {
    setLocalStorage('comments', data.comments);
    dataStorage = getLocalStorage('comments');
  }
  reloadComments(dataStorage);
  list.parentNode.appendChild(createForm('send', 'form--main'));

};

export const reloadComments = (dataStorage: any) => {
  list.innerHTML = '';
  const fragment = document.createDocumentFragment();
  dataStorage.forEach((comment: IComment) => {
    const li = createComment(comment);
    if (comment.replies.length > 0) {
      const repliesList = createReplies(comment.replies);
      li.appendChild(repliesList);
    }
    fragment.appendChild(li);
  });
  list?.appendChild(fragment);

}

//Listener


list.addEventListener('click', (e) => {
  const target = e.target as Element;
  if (target.classList.contains('img__plus')) {
    //TODO score actions
  }

  //TODO replyForm
  if (target.parentElement.classList.contains('actions__button--reply')) {
    const form = createForm('reply','form--reply');
    target.closest('.comment__item').appendChild(form)
  }
})

document.body.addEventListener('submit', e => {
 e.preventDefault()
  const target = e.target as HTMLFormElement;

  if (target.classList.contains('form--reply')) {
    target.comment.value === '' ? null : newReply(e)
  }
  if (target.classList.contains('form--main')) {
    target.comment.value === '' ? null : newComment(e)
  }
 
})



export default init;