export interface IUser {
  id:string,
  username:string,
  firstname:string,
  lastname:string,
  email:string
  posts:IPost[]
}

export interface IPost {
  id:string,
  userId:string,
  title:string,
  content:string
}
