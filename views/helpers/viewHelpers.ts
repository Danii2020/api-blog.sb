import fetch from 'node-fetch';
import boom from '@hapi/boom';
import { Request, response } from 'express';

class HelperFunctions {
  public static async fetchData(url:string, method:string, body?:object) {
    try {
      const response = await fetch(url, {
        method:method,
        headers:{
          "Content-Type": "application/json",
          cookie:  `jwt=${this.cookieExtractor}`
        },
        body:JSON.stringify(body)
      });
      return {
        data:await response.json(),
        ok:response.ok
      }
    } catch (error) {
      boom.internal("Internal server error");
    }
  }

  public static async deletePost(postId:number) {
    const response = <{data:any, ok:boolean}>await this.fetchData(`/view/posts/delete/${postId}`, "DELETE");
    if (!response.ok) return boom.internal("Internal server error");
  }

  public static hello() {
    return console.log("param");
  }

  public static cookieExtractor (req:Request):string {
    let token = null;
    if (req && req.cookies) token = req.cookies['jwt'];
    return token;
  }
}

export default HelperFunctions;
