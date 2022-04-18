import chai from 'chai';
import { expect } from 'chai';
import chaiHttp from 'chai-http';
import { config } from '../config/config';

chai.use(chaiHttp)

const URL = 'http://localhost:3000';
const usersRoute = '/api/v1/users';
const adminTestToken = <string> config.adminTestToken;
const userTestToken = <string> config.userTestToken;

describe("GET /users with 401 Unauthorized status", () => {
  context("when a GET request is made to /users route", () => {
    it ("returns a 401 HTTP code", (done) => {
      chai.request(URL)
        .get(usersRoute)
        .then((res) => {
          expect(res).to.have.status(401);
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
        .auth(userTestToken, {type: 'bearer'})
        .then((res) => {
          expect(res).to.have.status(200);
          expect(res.body.data).to.be.an('array');
          expect(res.body.data).length(5);
        done()
        }).catch((err) => done(err));
      });
  });
});


describe("GET /users/id with a 200 OK status code", () => {
  context("when a GET request is made to /users/id", () => {
    it ("returns the user whose id is the correct with a 200 HTTP status code", (done) => {
      chai.request(URL)
        .get(usersRoute + '/4')
        .auth(adminTestToken, {type: 'bearer'})
        .then((res) => {
          expect(res).to.have.status(200);
          expect(res.body.data.userId).to.be.equals(4);
          expect(res.body.data.firstname).to.be.equals('Andrea');
          expect(res.body.data.lastname).to.be.equals('Lopez');
        done();
        }).catch((err) => done(err));
    })
  });
});

describe("GET /users/id with a 404 not found status code", () => {
  context("when a GET request is made to /users/id", () => {
    it ("returns a 404 HTTP status code", (done) => {
      chai.request(URL)
        .get(usersRoute + '/50')
        .auth(adminTestToken, {type: 'bearer'})
        .then((res) => {
          expect(res).to.have.status(404);
        done();
        }).catch((err) => done(err));
    })
  });
});

describe("PATCH /users/id with a 201 status code", () => {
  context("when a PATCH request is made to /users/id", () => {
    it ("update a user property with a 201 HTTP status", (done) => {
      const updatedUser = {
        username:"carlii"
      }
      chai.request(URL)
        .patch(usersRoute + '/8')
        .auth(adminTestToken, {type: 'bearer'})
        .send(updatedUser)
        .then((res) => {
          expect(res).to.have.status(201);
          expect(res.body.data.userId).to.be.equals(8);
          expect(res.body.data.firstname).to.be.equals('Carla');
          expect(res.body.data.username).to.be.equals('carlii');
        done();
        }).catch((err) => done(err));
    })
  });
});

describe("PATCH /users/id with a 403 forbidden status code", () => {
  context("when a PATCH request is made to /users/id", () => {
    it ("returns a 403 HTTP status", (done) => {
      const updatedUser = {
        username:"carlii"
      }
      chai.request(URL)
        .patch(usersRoute + '/6')
        .auth(userTestToken, {type: 'bearer'})
        .send(updatedUser)
        .then((res) => {
          expect(res).to.have.status(403);
        done();
        }).catch((err) => done(err));
    });
  });
});

describe("PATCH /users/id with a 404 not found status code", () => {
  context("when a PATCH request is made to /users/id", () => {
    it ("returns a 404 HTTP status", (done) => {
      const updatedUser = {
        username:"carlii"
      }
      chai.request(URL)
        .patch(usersRoute + '/20')
        .auth(adminTestToken, {type: 'bearer'})
        .send(updatedUser)
        .then((res) => {
          expect(res).to.have.status(404);
        done();
        }).catch((err) => done(err));
    });
  });
});


describe("DELETE /users/id with 200 status code", () => {
  context("when a DELETE request is made to /users/id", () => {
    it ("deletes a user with a 200 HTTP status", (done) => {
      chai.request(URL)
        .delete(usersRoute + '/8')
        .auth(adminTestToken, {type: 'bearer'})
        .then((res) => {
          expect(res).to.have.status(200);
          expect(res.body.data.userId).to.be.equals(8);
          expect(res.body.data.firstname).to.be.equals('Carla');
        done();
        }).catch((err) => done(err));
    })
  });
});

describe("DELETE /users/id with a 403 forbidden status code", () => {
  context("when a DELETE request is made to /users/id", () => {
    it ("returns a 403 HTTP status", (done) => {
      chai.request(URL)
        .delete(usersRoute + '/6')
        .auth(userTestToken, {type: 'bearer'})
        .then((res) => {
          expect(res).to.have.status(403);
        done();
        }).catch((err) => done(err));
    })
  });
});

describe("DELETE /users/id with a 404 not found status code", () => {
  context("when a DELETE request is made to /users/id", () => {
    it ("returns a 404 HTTP status", (done) => {
      chai.request(URL)
        .delete(usersRoute + '/25')
        .auth(userTestToken, {type: 'bearer'})
        .then((res) => {
          expect(res).to.have.status(404);
        done();
        }).catch((err) => done(err));
    })
  });
});

describe("GET /users/sortbyalpha", () => {
  context("when a GET request is made to the /users/sortbyalpha route", () => {
    it("returns all users sorted by name", (done) => {
      chai.request(URL)
        .get(usersRoute + '/sortbyalpha')
        .auth(userTestToken, {type: 'bearer'})
        .then((res) => {
          expect(res.body.data[0].firstname).to.be.equals("Andrea");
          expect(res.body.data[1].firstname).to.be.equals("Bernarda");
          expect(res.body.data[2].firstname).to.be.equals("Daniel");
        done()
        }).catch((err) => done(err))
    });
  });
});

describe("GET /users/sortbyalpha", () => {
  context("when a GET request is made to the /users/sortbyalpha route", () => {
    it("returns all users whose lastnames are in upper case", (done) => {
      chai.request(URL)
        .get(usersRoute + '/sortbyalpha')
        .auth(userTestToken, {type: 'bearer'})
        .then((res) => {
          expect(res.body.data[0].lastname).to.be.equals("LOPEZ");
          expect(res.body.data[1].lastname).to.be.equals("ESPINOZA");
          expect(res.body.data[2].lastname).to.be.equals("ERAZO");
        done()
        }).catch((err) => done(err))
    });
  });
});

describe("GET /users/abcnames", () => {
  context("when a GET request is made to the /users/abcnames route", () => {
    it("returns all users whose firstnames starts with 'a', 'b' and 'c'", (done) => {
      chai.request(URL)
        .get(usersRoute + '/abcnames')
        .auth(userTestToken, {type: 'bearer'})
        .then((res) => {
          expect(res.body.data[0].firstname).to.be.equals("Andrea");
          expect(res.body.data[1].firstname).to.be.equals("Bernarda");
        done()
        }).catch((err) => done(err))
    });
  });
});

describe("GET /users/countabc", () => {
  context("when a GET request is made to the /users/countabc route", () => {
    it("returns the number of users whose firstname starts with 'a', 'b' and 'c'", (done) => {
      chai.request(URL)
        .get(usersRoute + '/countabc')
        .auth(userTestToken, {type: 'bearer'})
        .then((res) => {
          expect(res.body.data.aNames).to.be.equals(1);
          expect(res.body.data.bNames).to.be.equals(1);
          expect(res.body.data.cNames).to.be.equals(0);

        done()
        }).catch((err) => done(err))
    });
  });
});


