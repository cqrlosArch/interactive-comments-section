import data from '../assets/data.json';
const list = document.querySelector('.comments__list')

const init = () => {
  const templateComment = <HTMLTemplateElement>document.getElementById('template-comment');

  const fragment = document.createDocumentFragment();

  data.comments.forEach(c => {
    console.log(c);
    templateComment.content.querySelector('.comment')?.setAttribute("data-id", c.id.toString())
    templateComment.content.querySelector('.user__avatar')?.firstElementChild?.setAttribute("srcset", c.user.image.png)
    templateComment.content.querySelector('.user__avatar')?.firstElementChild?.nextElementSibling?.setAttribute("srcset", c.user.image.webp)
    templateComment.content.querySelector('.user__avatar')?.lastElementChild?.setAttribute("src", c.user.image.png)
    templateComment.content.querySelector('.user__avatar')?.lastElementChild?.setAttribute("alt", c.user.username)
    templateComment.content.querySelector('.user__name').textContent = c.user.username
    templateComment.content.querySelector('.user__date').textContent = c.createdAt
    const clone = document.importNode(templateComment.content, true);
    fragment.appendChild(clone);

  })

  list?.appendChild(fragment);



  console.log(templateComment)
}


export default init;