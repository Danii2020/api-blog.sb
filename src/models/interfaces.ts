interface IUser {
  userId:number,
  firstname:string,
  lastname:string,
  username:string,
  email:string,
  password?:string,
  role:string,
  posts:IPost[] | null
}

interface IPost {
  postId:number,
  title:string,
  createdAt:Date,
  content:string,
  published:boolean,
  authorId:number,
  user:IUser
}

export { IUser, IPost }
