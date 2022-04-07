export interface IUser {
  id:number,
  username:string,
  firstname:string,
  lastname:string,
  email:string
  posts:IPost[]
}

export interface IPost {
  id:string,
  title:string,
  body:string,
  likes:number
}
