import chai from 'chai';
import { expect } from 'chai';
import chaiHttp from 'chai-http';
import { config } from '../config/config';
import {app} from './../src/server';

chai.use(chaiHttp)

const URL = 'http://localhost:3000';
const postsRoute = '/api/v1/posts';
const adminTestToken = <string> config.adminTestToken;
const userTestToken = <string> config.userTestToken;

describe("GET /posts with a 200 OK status code", () => {
  context("when a GET request is made to /posts route", () => {
    it("returns all posts with a 200 HTTP status code", (done) => {
      chai.request(app)
        .get(postsRoute)
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body.data).to.be.an('array');
          expect(res.body.data).length(3);
        done();
      });
    });
  });
});

// describe("GET /posts/id with a 200 OK status code", () => {
//   context("when a GET request is made to /posts route", () => {
//     it("returns the post whose id is the correct with a 200 HTTP status code", (done) => {
//       chai.request(URL)
//         .get(postsRoute + '/2')
//         .set('Cookie', `jwt=${adminTestToken}`)
//         .then((res) => {
//           expect(res).to.have.status(200);
//           expect(res.body.data.postId).to.be.equals(2);
//           expect(res.body.data.title).to.be.equals("A new post");
//           expect(res.body.data.createdAt).to.be.equals("2022-04-26T20:14:25.689Z");
//           expect(res.body.data.authorId).to.be.equals(2);
//           expect(res.body.data.user.username).to.be.equals("daniiee");
//         done()
//         }).catch((err) => done(err));
//     });
//   });
// });

// describe("GET /posts/id with a 401 unauthorized status code", () => {
//   context("when a GET request is made to /posts route", () => {
//     it("returns a 401 unauthorized HTTP status code", (done) => {
//       chai.request(URL)
//         .get(postsRoute + '/2')
//         .then((res) => {
//           expect(res).to.have.status(401);
//         done()
//         }).catch((err) => done(err));
//     });
//   });
// });

// describe("GET /posts/id with a 404 not found status code", () => {
//   context("when a GET request is made to /posts route", () => {
//     it("returns a 404 HTTP status code", (done) => {
//       chai.request(URL)
//         .get(postsRoute + '/50')
//         .set('Cookie', `jwt=${adminTestToken}`)
//         .then((res) => {
//           expect(res).to.have.status(404);
//         done()
//         }).catch((err) => done(err));
//     });
//   });
// });

// describe("POST /posts with a a 200 OK status code", () => {
//   context("when a POST request is made to /posts route", () => {
//     it("creates a new post with a 200 HTTP status code", (done) => {
//       const newPost = {
//         title:"Daniel's new post",
//         content:"This is the new Daniel's post"
//       }
//       chai.request(URL)
//         .post(postsRoute)
//         .set('Cookie', `jwt=${adminTestToken}`)
//         .send(newPost)
//         .then((res) => {
//           expect(res).to.have.status(200);
//           expect(res.body.data.postId).to.be.equals(8);
//           expect(res.body.data.title).to.be.equals("Daniel's new post");
//           expect(res.body.data.authorId).to.be.equals(2);
//         done()
//         }).catch((err) => done(err));
//     });
//   });
// });

// describe("POST /posts with a a 401 unauthorized status code", () => {
//   context("when a POST request is made to /posts/id route", () => {
//     it("returns a 401 HTTP status code", (done) => {
//       const newPost = {
//         title:"Vanessa's post",
//         content:"This is my new post"
//       }
//       chai.request(URL)
//         .post(postsRoute)
//         .send(newPost)
//         .then((res) => {
//           expect(res).to.have.status(401);
//         done()
//         }).catch((err) => done(err));
//     });
//   });
// });

// describe("PATCH /posts/update/id with a a 201 status code", () => {
//   context("when a PATCH request is made to /posts/id route", () => {
//     it("updates the post property with a 201 HTTP status code", (done) => {
//       const updatedPost = {
//         title:"I really hate PHP"
//       }
//       chai.request(URL)
//         .patch(postsRoute + '/update/1')
//         .set('Cookie', `jwt=${adminTestToken}`)
//         .send(updatedPost)
//         .then((res) => {
//           expect(res).to.have.status(201);
//           expect(res.body.data.title).to.be.equals("I really hate PHP");
//           expect(res.body.data.content).to.be.equals("This is my new post");
//           expect(res.body.data.authorId).to.be.equals(2);
//         done()
//         }).catch((err) => done(err));
//     });
//   });
// });

// describe("PATCH /posts/update/id with a 401 unauthorized status code", () => {
//   context("when a PATCH request is made to /posts/update/id route", () => {
//     it("returns a 401 unauthorized HTTP status code", (done) => {
//       const updatedPost = {
//         title:"I love JavaScript"
//       }
//       chai.request(URL)
//         .patch(postsRoute + '/update/2')
//         .send(updatedPost)
//         .then((res) => {
//           expect(res).to.have.status(401);
//         done()
//         }).catch((err) => done(err));
//     });
//   });
// });

// describe("PATCH /posts/update/id with a 404 not found status code", () => {
//   context("when a PATCH request is made to /posts/update/id route", () => {
//     it("returns a 404 HTTP status code", (done) => {
//       const updatedPost = {
//         title:"I love JavaScript"
//       }
//       chai.request(URL)
//         .patch(postsRoute + '/update/25')
//         .set('Cookie', `jwt=${userTestToken}`)
//         .send(updatedPost)
//         .then((res) => {
//           expect(res).to.have.status(404);
//         done()
//         }).catch((err) => done(err));
//     });
//   });
// });

// describe("DELETE /posts/delete/id with a 200 OK status code", () => {
//   context("when a DELETE request is made to /posts/id route", () => {
//     it("deletes the post with a 200 HTTP status code", (done) => {
//       chai.request(URL)
//         .delete(postsRoute + '/delete/7')
//         .set('Cookie', `jwt=${adminTestToken}`)
//         .then((res) => {
//           expect(res).to.have.status(200);
//           expect(res.body.data.postId).to.be.equals(7);
//           expect(res.body.data.authorId).to.be.equals(1);
//           expect(res.body.data.title).to.be.equals("Andrea's post");
//         done()
//         }).catch((err) => done(err));
//     });
//   });
// });

// describe("DELETE /posts/delete/id with a 401 unauthorized status code", () => {
//   context("when a DELETE request is made to /posts/id route", () => {
//     it("returns a 401 unauthorized HTTP status code", (done) => {
//       chai.request(URL)
//         .delete(postsRoute + '/delete/7')
//         .then((res) => {
//           expect(res).to.have.status(401);
//         done()
//         }).catch((err) => done(err));
//     });
//   });
// });

// describe("DELETE /posts/delete/id with a 404 not found status code", () => {
//   context("when a DELETE request is made to /posts/id route", () => {
//     it("returns a 404 HTTP status code", (done) => {
//       chai.request(URL)
//         .delete(postsRoute + '/delete/56')
//         .set('Cookie', `jwt=${adminTestToken}`)
//         .then((res) => {
//           expect(res).to.have.status(404);
//         done()
//         }).catch((err) => done(err));
//     });
//   });
// });
