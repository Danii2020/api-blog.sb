import { Request } from "express";



  async function fetchData(url:string, method:string, body?:object) {
    try {
      const response = await fetch(url, {
        method:method,
        headers:{
          "Content-Type": "application/json",
          cookie:  `jwt=${cookieExtractor}`
        },
        body:JSON.stringify(body)
      });
      return {
        data:await response.json(),
        ok:response.ok
      }
    } catch (error) {
      console.log(error)
    }
  }

  async function deletePost(postId:number) {
    const response = <{data:any, ok:boolean}> await fetchData(`/view/posts/delete/${postId}`, "DELETE");
    if (!response.ok) return console.log("Error")
  }

  function hello() {
    console.log("param");
  }

  function cookieExtractor (req:Request) {
    let token = null;
    if (req && req.cookies) token = req.cookies['jwt'];
    return token;
  }
