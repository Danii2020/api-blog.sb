interface IUser {
  userId:number,
  name:string,
  username:string,
  email:string,
  role:string,
  posts:IPost[]
}

interface IPost {
  postId:number,
  title:string,
  createdAt:Date,
  content:string,
  published:boolean,
  authorId:number
}

export { IUser, IPost }
