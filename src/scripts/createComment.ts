import data from '../assets/data.json';
const list = document.querySelector('.comments__list');
import { IComment, IReply } from './interfaces';
import getUser from './getUser'

const createComment = (c: IComment) => {
  const templateComment = <HTMLTemplateElement>(
    document.getElementById('template-comment')
  );
  templateComment.content
    .querySelector('.comment')
    ?.setAttribute('data-id', c.id.toString());
  templateComment.content
    .querySelector('.user__avatar')
    ?.firstElementChild?.setAttribute('srcset', c.user.image.png);
  templateComment.content
    .querySelector('.user__avatar')
    ?.firstElementChild?.nextElementSibling?.setAttribute(
      'srcset',
      c.user.image.webp
    );
  templateComment.content
    .querySelector('.user__avatar')
    ?.lastElementChild?.setAttribute('src', c.user.image.png);
  templateComment.content
    .querySelector('.user__avatar')
    ?.lastElementChild?.setAttribute('alt', c.user.username);
  templateComment.content.querySelector('.user__name').textContent =
    c.user.username;
  templateComment.content.querySelector('.user__date').textContent =
    c.createdAt;
  templateComment.content.querySelector('.user__comment').textContent =
    c.content;
  templateComment.content.querySelector('.score__votes').textContent =
    c.score.toString();
  const clone = document.importNode(templateComment.content, true);
  return clone;
};

const createReply = (r: IReply[]) => {
  const templateComment = <HTMLTemplateElement>(
    document.getElementById('template-comment')
  );
  const listReplies = document.createElement('ul');
  listReplies.classList.add('list__replies');
  r.forEach((reply) => {
    const liRreply = document.createElement('li');
    const clone = document.importNode(templateComment.content, true);
    clone
      .querySelector('.comment')
      ?.setAttribute('data-id', reply.id.toString());
    clone
      .querySelector('.user__avatar')
      ?.firstElementChild?.setAttribute('srcset', reply.user.image.png);
    clone
      .querySelector('.user__avatar')
      ?.firstElementChild?.nextElementSibling?.setAttribute(
        'srcset',
        reply.user.image.webp
      );
    clone
      .querySelector('.user__avatar')
      ?.lastElementChild?.setAttribute('src', reply.user.image.png);
    clone
      .querySelector('.user__avatar')
      ?.lastElementChild?.setAttribute('alt', reply.user.username);
    clone.querySelector('.user__name').textContent = reply.user.username;
    clone.querySelector('.user__date').textContent = reply.createdAt;

    clone.querySelector(
      '.user__comment'
    ).innerHTML = `<span class="user__replyingto">@${reply.replyingTo}</span> ${reply.content}`;
    clone.querySelector('.score__votes').textContent = reply.score.toString();
    liRreply.appendChild(clone);
    listReplies.appendChild(liRreply);
  });

  return listReplies;
};

const init = () => {
  const fragment = document.createDocumentFragment();
  getUser(data.currentUser);
  data.comments.forEach((comment) => {
    console.log(comment);
    const li = document.createElement('li');
    const clone = createComment(comment);
    li.appendChild(clone);
    if (comment.replies.length > 0) {
      const replies = createReply(comment.replies);
      li.appendChild(replies);
    }
    fragment.appendChild(li);
  });
  list?.appendChild(fragment);
};

export default init;
