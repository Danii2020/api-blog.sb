export interface IUser {
  id:number,
  name:string,
  email:string,
  post:IPost[],
  profile:IProfile
}

export interface IPost {
  id:string,
  userId:string,
  title:string,
  content:string
}

export interface IProfile {
  id:number,
  bio:string,
  userId:number,
  user:IUser
}
