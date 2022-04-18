import chai from 'chai';
import { expect } from 'chai';
import chaiHttp from 'chai-http';
import { config } from '../config/config';

chai.use(chaiHttp)

const URL = 'http://localhost:3000';
const authRoute = '/api/v1/auth';
const adminTestToken = <string> config.adminTestToken;
const userTestToken = <string> config.userTestToken;

describe("POST /signup with 200 OK status code", () => {
  context("when a POST request is made to /signup route", () => {
    it("create a new user with a 200 HTTP status code", (done) => {
      const newUser = {
        firstname:"Vanessa",
        lastname:"Rodriguez",
        username:"vanee",
        email:"vanessa@gmail.com",
        password:"vanessa123"
      }
      chai.request(URL)
        .post(authRoute + "/signup")
        .send(newUser)
        .then((res) => {
          expect(res).to.have.status(200);
          expect(res.body.data.userId).to.be.equals(10);
          expect(res.body.data.firstname).to.be.equals('Vanessa');
          expect(res.body.data.email).to.be.equals("vanessa@gmail.com");
        done()
        });
    });
  });
});

describe("POST /login with 200 OK status code", () => {
  context("when a POST request is made to /login route", () => {
    it("login the user with a 200 HTTP status code", (done) => {
      const loginCredentials = {
        email:"vanessa@gmail.com",
        password:"vanessa123"
      }
      chai.request(URL)
        .post(authRoute + "/login")
        .send(loginCredentials)
        .then((res) => {
          expect(res).to.have.status(200);
          expect(res.body.user.userId).to.be.equals(10);
          expect(res.body.user.firstname).to.be.equals('Vanessa');
          expect(res.body.user.lastname).to.be.equals("Rodriguez");
          expect(res.body.token).to.be.a("string");
          expect(res.body.token).length(159);
        done()
        });
    });
  });
});

describe("POST /login with 401 status code", () => {
  context("when a POST request is made to /login route", () => {
    it("does not login the user and returns a 401 HTTP status code", (done) => {
      const badLoginCredentials = {
        email:"vanessa1@gmail.com",
        password:"vanessa1234"
      }
      chai.request(URL)
        .post(authRoute + "/login")
        .send(badLoginCredentials)
        .then((res) => {
          expect(res).to.have.status(401);
        done()
        }).catch((err) => done(err));
    });
  });
});
