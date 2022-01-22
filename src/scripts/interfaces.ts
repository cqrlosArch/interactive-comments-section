interface IComment {
  id: number;
  content: string;
  createdAt: string | Date;
  score: number;
  user: IUser;
  replies?: IReply[];
}

interface IReply extends IComment {
  replyingTo: string;

}

interface IUser {
  image?: IAvatar;
  username: string;
}

interface IAvatar {
  png: string;
  webp: string;
}

export { IComment, IUser, IAvatar, IReply };
