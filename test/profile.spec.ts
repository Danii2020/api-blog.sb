import chai from 'chai';
import { expect } from 'chai';
import chaiHttp from 'chai-http';
import { config } from '../config/config';

chai.use(chaiHttp)

const URL = 'http://localhost:3000';
const profileRoute = '/api/v1/profile';
const adminTestToken = <string> config.adminTestToken;
const userTestToken = <string> config.userTestToken;

describe("GET /my-posts with a 200 OK status code", () => {
  context("when a GET request is made to /my-posts route", () => {
    it("returns all the posts of the login user with a 200 HTTP status code", (done) => {
      chai.request(URL)
        .get(profileRoute + '/my-posts')
        .auth(userTestToken, {type: 'bearer'})
        .then((res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.be.an("array");
          expect(res.body).length(1);
          expect(res.body[0].title).to.be.eqls("Vanessa's post");
          expect(res.body[0].postId).to.be.equals(5);
        done()
        }).catch((err) => done(err));
    });
  });
});

describe("GET /my-posts with a 401 unauthorized status code", () => {
  context("when a GET request is made to /my-posts route", () => {
    it("returns a 401 HTTP status code", (done) => {
      chai.request(URL)
        .get(profileRoute + '/my-posts')
        .then((res) => {
          expect(res).to.have.status(401);
        done()
        }).catch((err) => done(err));
    });
  });
});
