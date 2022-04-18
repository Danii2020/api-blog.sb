import chai from 'chai';
import { expect } from 'chai';
import chaiHttp from 'chai-http';
import { config } from '../config/config';

chai.use(chaiHttp)

const URL = 'http://localhost:3000';
const postsRoute = '/api/v1/posts';
const adminTestToken = <string> config.adminTestToken;
const userTestToken = <string> config.userTestToken;

describe("GET /posts with a 200 OK status code", () => {
  context("when a GET request is made to /posts route", () => {
    it("returns all posts with a 200 HTTP status code", (done) => {
      chai.request(URL)
        .get(postsRoute)
        .then((res) => {
          expect(res).to.have.status(200);
          expect(res.body.data).to.be.an('array');
          expect(res.body.data).length(2);
        done()
        }).catch((err) => done(err));
    });
  });
});

describe("GET /posts/id with a 200 OK status code", () => {
  context("when a GET request is made to /posts route", () => {
    it("returns the post whose id is the correct with a 200 HTTP status code", (done) => {
      chai.request(URL)
        .get(postsRoute + '/1')
        .then((res) => {
          expect(res).to.have.status(200);
          expect(res.body.data.postId).to.be.equals(1);
          expect(res.body.data.title).to.be.equals("Daniel's post");
          expect(res.body.data.createdAt).to.be.equals("2022-04-14T17:13:40.625Z");
          expect(res.body.data.authorId).to.be.equals(1);
          expect(res.body.data.user.username).to.be.equals("dan");
        done()
        }).catch((err) => done(err));
    });
  });
});

describe("GET /posts/id with a 404 not found status code", () => {
  context("when a GET request is made to /posts route", () => {
    it("returns a 404 HTTP status code", (done) => {
      chai.request(URL)
        .get(postsRoute + '/50')
        .then((res) => {
          expect(res).to.have.status(404);
        done()
        }).catch((err) => done(err));
    });
  });
});

// describe("POST /posts/id with a a 200 OK status code", () => {
//   context("when a POST request is made to /posts route", () => {
//     it("creates a new post with a 200 HTTP status code", (done) => {
//       const newPost = {
//         title:"Vanessa's post",
//         content:"This is my new post"
//       }
//       chai.request(URL)
//         .post(postsRoute)
//         .auth(userTestToken, {type: 'bearer'})
//         .send(newPost)
//         .then((res) => {
//           expect(res).to.have.status(200);
//           expect(res.body.data.postId).to.be.equals(2);
//           expect(res.body.data.title).to.be.equals("Vanessa's post");
//           expect(res.body.data.authorId).to.be.equals(10);
//         done()
//         }).catch((err) => done(err));
//     });
//   });
// });

describe("POST /posts/id with a a 401 unauthorized status code", () => {
  context("when a POST request is made to /posts route", () => {
    it("returns a 401 HTTP status code", (done) => {
      const newPost = {
        title:"Vanessa's post",
        content:"This is my new post"
      }
      chai.request(URL)
        .post(postsRoute)
        .send(newPost)
        .then((res) => {
          expect(res).to.have.status(401);
        done()
        }).catch((err) => done(err));
    });
  });
});
