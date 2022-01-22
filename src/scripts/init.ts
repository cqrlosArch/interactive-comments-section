import { IComment } from './interfaces'
import data from '../assets/data.json';
const form = document.getElementById('form')
const list = document.querySelector('.comments__list');
import newComment from './newComment';

import { getLocalStorage, setLocalStorage, removeLocalStorage, clearLocalStorage } from './storage';
import createComment from './createComment'
import createReplies from './createReplies'


const init = () => {
  let dataStorage
  if (getLocalStorage('comments')) {
    dataStorage = getLocalStorage('comments');
  } else {
    setLocalStorage('comments', data.comments);
    dataStorage = getLocalStorage('comments');

  }
  reloadComments(dataStorage);
};

export const reloadComments = (dataStorage: any) => {
  list.innerHTML = '';
  const fragment = document.createDocumentFragment();
  dataStorage.forEach((comment: IComment) => {
    // const li = document.createElement('li');
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
form.addEventListener('submit', newComment)
list.addEventListener('click', (e) => {
  e.preventDefault();
  const target = e.target as Element;
  console.log(target);
  if(target.classList.contains('img__plus')){ 
    console.log('f')
  }
})

export default init;