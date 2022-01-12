import { IUser } from './interfaces'

export default function createUser(currentUser: IUser) {

  const picture = document.getElementById('form-avatar')

  if (currentUser) {
    const sourcePNG = document.createElement('source')
    const sourceWEBP = document.createElement('source')
    const img = document.createElement('img')
    sourcePNG.setAttribute('type', 'image/png')
    sourceWEBP.setAttribute('type', 'image/webp')
    sourcePNG.setAttribute('srcset', currentUser.image.png)
    sourceWEBP.setAttribute('srcset', currentUser.image.webp)
    img.setAttribute('src', currentUser.image.png)
    img.setAttribute('alt', currentUser.username)
    picture.appendChild(sourcePNG)
    picture.appendChild(sourceWEBP)
    picture.appendChild(img)
  }
}