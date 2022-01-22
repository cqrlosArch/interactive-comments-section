import { IReply} from './interfaces';
import createComment from './createComment';

const createReplies = (r: IReply[]) => {
  const listReplies = document.createElement('ul');
  listReplies.classList.add('list__replies');
  r.forEach((reply) => {
   
    const clone = createComment(reply);
  
    listReplies.appendChild(clone);
  });

  return listReplies;
};

export default createReplies