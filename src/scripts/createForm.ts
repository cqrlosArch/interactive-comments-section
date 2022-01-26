import data from '../assets/data.json';


export let currentUser = data.currentUser;

export default function createForm(label='send', className:string) {
  const templateForm = <HTMLTemplateElement>(
    document.getElementById('template-form')
  );
  const clone = document.importNode(templateForm.content, true);
  const sourcePNG = document.createElement('source')
  const sourceWEBP = document.createElement('source')
  const img = document.createElement('img')
  sourcePNG.setAttribute('type', 'image/png')
  sourceWEBP.setAttribute('type', 'image/webp')
  sourcePNG.setAttribute('srcset', currentUser.image.png)
  sourceWEBP.setAttribute('srcset', currentUser.image.webp)
  img.setAttribute('src', currentUser.image.png)
  img.setAttribute('alt', currentUser.username)
  clone.querySelector('.form').classList.add(className)
  clone.querySelector('.form__avatar').appendChild(sourcePNG)
  clone.querySelector('.form__avatar').appendChild(sourceWEBP)
  clone.querySelector('.form__avatar').appendChild(img)
  clone.querySelector('.form__submit').textContent = label
  return clone
}