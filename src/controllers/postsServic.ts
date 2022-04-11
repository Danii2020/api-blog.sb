import { IPost } from './models/interfaces/interfaces';
import boom from '@hapi/boom';
import { string } from 'joi';

class PostsService {
  private _posts:IPost[];
  constructor() {
    this._posts = [];
    this.generate();
  }

  generate() {
    const limit:number = 10;
    for (let i=0; i<limit; i++) {
      this._posts.push({
        id:String(Math.floor(Math.random() * (10 - 1 + 1) + 1)),
        userId:String(Math.floor(Math.random() * (10 - 1 + 1) + 1)),
        title:"Post Example",
        content:"This is an example"
      });
    }
  }

  async find():Promise<IPost[]> {
    return this._posts;
  }

  async findOne(id:string):Promise<IPost> {
    const post = this._posts.find(item => item.id === id);
    if (!post) {
      throw boom.notFound('Post not found');
    }
    return post;
  }

  async create(data:IPost):Promise<IPost> {
    const {id="", userId="", title="", content=""} = data;
    const post:IPost =  {
      id:String(Math.floor(Math.random() * (10 - 1 + 1) + 1)),
      userId:String(Math.floor(Math.random() * (10 - 1 + 1) + 1)),
      title,
      content
    }
    this._posts.push(post);
    return post;
  }

  async update(id:string, changes:IPost):Promise<IPost> {
    const index:number = this._posts.findIndex(item => item.id === id);
    if (index == -1) {
      throw boom.notFound('Post not found');
    }
    const post:IPost = this._posts[index];
    this._posts[index] = {
      ...post,
      ...changes
    }
    return this._posts[index];
  }

  async delete(id:string):Promise<string> {
    const index = this._posts.findIndex(item => item.id === id);
    if (index === -1) {
      throw boom.notFound('Post not found');
    }
    this._posts.splice(index, 1);
    return "Post with id: " + id + " deleted";
  }

}

export default PostsService;

