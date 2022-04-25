import { Post } from "@prisma/client";
import { IUser } from "./userInterface";

interface IPostService {
  getAllPosts():Promise<Post[] | null>;
  getOnePost(id:number):Promise<Post | null>;
  createPost(body:IPostBody, user:IUser):Promise<Post>;
  patchPost(id:number, changes:IPostBody):Promise<Post | null>;
  deletePost(id:number):Promise<Post | null>;
  getPostsByUser(id:number):Promise<Post[]>
}

interface IPostBody {
  title:string,
  content:string
}

export {IPostService, IPostBody};
