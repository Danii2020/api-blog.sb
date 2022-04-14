import chai from 'chai';
import { expect } from 'chai';
import chaiHttp from 'chai-http';
import { config } from '../config/config';

chai.use(chaiHttp)

const URL = 'http://localhost:3000';
const usersRoute = '/api/v1/users';
const adminTestToken = <string> config.adminTestToken;
const userTestToken = <string> config.userTestToken;

describe("GET /users with 403 forbidden status", () => {
  context("when a GET request is made to /users route", () => {
    it ("returns a 401 HTTP code", (done) => {
      chai.request(URL)
        .get(usersRoute)
        .auth(userTestToken, {type: 'bearer'})
        .then((res) => {
          expect(res).to.have.status(403);
        done()
        }).catch((err) => done(err));
      });
  });
});


describe("GET /users with 200 OK status", () => {
  context("when a GET request is made to /users route", () => {
    it ("returns all users with a 200 HTTP status", (done) => {
      chai.request(URL)
        .get(usersRoute)
        .auth(adminTestToken, {type: 'bearer'})
        .then((res) => {
          expect(res).to.have.status(200);
          expect(res.body.data).to.be.an('array');
          expect(res.body.data).length(7);
        done()
        }).catch((err) => done(err));
      });
  });
});


describe("GET /users/id", () => {
  context("when a GET request is made to /users/id", () => {
    it ("returns the user whose id is the correct", (done) => {
      chai.request(URL)
        .get(usersRoute + '/4')
        .auth(adminTestToken, {type: 'bearer'})
        .then((res) => {
          expect(res.body.data.userId).to.be.equals(4);
          expect(res.body.data.firstname).to.be.equals('Andrea');
          expect(res.body.data.lastname).to.be.equals('Lopez');
        done();
        }).catch((err) => done(err));
    })
  });
});

describe("PATCH /users/id", () => {
  context("when a PATCH request is made to /users/id", () => {
    it ("update a user property with a 201 HTTP status", (done) => {
      const updatedUser = {
        username:"carlii"
      }
      chai.request(URL)
        .patch(usersRoute + '/2')
        .auth(adminTestToken, {type: 'bearer'})
        .send(updatedUser)
        .then((res) => {
          expect(res).to.have.status(201);
          expect(res.body.data.userId).to.be.equals(2);
          expect(res.body.data.firstname).to.be.equals('Carla');
          expect(res.body.data.username).to.be.equals('carlii');
        done();
        }).catch((err) => done(err));
    })
  });
});


