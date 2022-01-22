import data from '../assets/data.json';

import { IComment } from './interfaces';

export let currentUser = data.currentUser;

const isValidDate = (date: any) => {
  return date instanceof Date && !isNaN(date.getTime());
}

const formatDate = (date: Date) => {
  const time = Math.round((new Date().getTime() - date.getTime()) / 1000);
  return (
    time < 60 ? 'Just now' :
      time < 3600 ? Math.round(time / 60) + ' minutes ago' :
        time < 86400 ? Math.round(time / 3600) + ' hours ago' :
          time < 604800 ? Math.round(time / 86400) + ' days ago' :
            time < 2592000 ? Math.round(time / 604800) + ' weeks ago' :
              time < 31536000 ? Math.round(time / 2592000) + ' months ago' :
                Math.round(time / 31536000) + ' years ago'
  )
}


const configActions = (clone: any, username: string) => {
  if (currentUser.username !== username) {
    clone.content.querySelector('.actions__button--reply').classList.add('actions__button--visible');
  } else {
    clone.content.querySelector('.actions__button--edit').classList.add('actions__button--visible');
    clone.content.querySelector('.actions__button--delete').classList.add('actions__button--visible');
  }
}


const createComment = (c: IComment) => {
  const templateComment = <HTMLTemplateElement>(
    document.getElementById('template-comment')
  );
  const clone = document.importNode(templateComment, true);
  const li = document.createElement('li');
  li.setAttribute('data-id', c.id.toString());
  li.classList.add('comment__item');
  clone.content
    .querySelector('.user__avatar')
    ?.firstElementChild?.setAttribute('srcset', c.user.image.png);
  clone.content
    .querySelector('.user__avatar')
    ?.firstElementChild?.nextElementSibling?.setAttribute(
      'srcset',
      c.user.image.webp
    );
  clone.content
    .querySelector('.user__avatar')
    ?.lastElementChild?.setAttribute('src', c.user.image.png);
  clone.content
    .querySelector('.user__avatar')
    ?.lastElementChild?.setAttribute('alt', c.user.username);
  clone.content.querySelector('.user__name').textContent =
    c.user.username;
  clone.content.querySelector('.user__date').textContent = isValidDate(new Date(c.createdAt)) && formatDate(new Date(c.createdAt)) 
  clone.content.querySelector('.user__date').setAttribute('datetime', c.createdAt.toString());
  clone.content.querySelector('.user__comment').textContent =
    c.content;
  clone.content.querySelector('.score__votes').textContent =
    c.score.toString();
  configActions(clone, c.user.username);
  li.appendChild(clone.content);
  return li
};




export default createComment

