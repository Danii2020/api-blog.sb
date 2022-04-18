import axios from 'axios';
import boom from '@hapi/boom';
import { NextFunction, Request, Response } from 'express';

const URL = 'http://localhost:3000/api/v1'

class RenderService {
  private static async fetchData(api_url:string):Promise<any>{
    try {
        const response = await axios.get(api_url);
        return response.data;
    } catch (err) {
        throw(err);
    }
  }

  public static async renderPosts(req:Request, res:Response, next:NextFunction) {
    try {
      const posts = await axios.get(URL + '/posts')
      console.log(posts.data.data)
      res.render('posts', {posts:posts.data.data});
    } catch (error) {
      next(error)
    }
  }
}

export default RenderService;

