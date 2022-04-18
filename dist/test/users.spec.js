"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = __importDefault(require("chai"));
const chai_2 = require("chai");
const chai_http_1 = __importDefault(require("chai-http"));
const config_1 = require("../config/config");
chai_1.default.use(chai_http_1.default);
const URL = 'http://localhost:3000';
const usersRoute = '/api/v1/users';
const adminTestToken = config_1.config.adminTestToken;
const userTestToken = config_1.config.userTestToken;
describe("GET /users with 401 Unauthorized status", () => {
    context("when a GET request is made to /users route", () => {
        it("returns a 401 HTTP code", (done) => {
            chai_1.default.request(URL)
                .get(usersRoute)
                .then((res) => {
                (0, chai_2.expect)(res).to.have.status(401);
                done();
            }).catch((err) => done(err));
        });
    });
});
describe("GET /users with 200 OK status", () => {
    context("when a GET request is made to /users route", () => {
        it("returns all users with a 200 HTTP status", (done) => {
            chai_1.default.request(URL)
                .get(usersRoute)
                .auth(userTestToken, { type: 'bearer' })
                .then((res) => {
                (0, chai_2.expect)(res).to.have.status(200);
                (0, chai_2.expect)(res.body.data).to.be.an('array');
                (0, chai_2.expect)(res.body.data).length(5);
                done();
            }).catch((err) => done(err));
        });
    });
});
describe("GET /users/id with a 200 OK status code", () => {
    context("when a GET request is made to /users/id", () => {
        it("returns the user whose id is the correct with a 200 HTTP status code", (done) => {
            chai_1.default.request(URL)
                .get(usersRoute + '/4')
                .auth(adminTestToken, { type: 'bearer' })
                .then((res) => {
                (0, chai_2.expect)(res).to.have.status(200);
                (0, chai_2.expect)(res.body.data.userId).to.be.equals(4);
                (0, chai_2.expect)(res.body.data.firstname).to.be.equals('Andrea');
                (0, chai_2.expect)(res.body.data.lastname).to.be.equals('Lopez');
                done();
            }).catch((err) => done(err));
        });
    });
});
describe("GET /users/id with a 404 not found status code", () => {
    context("when a GET request is made to /users/id", () => {
        it("returns a 404 HTTP status code", (done) => {
            chai_1.default.request(URL)
                .get(usersRoute + '/50')
                .auth(adminTestToken, { type: 'bearer' })
                .then((res) => {
                (0, chai_2.expect)(res).to.have.status(404);
                done();
            }).catch((err) => done(err));
        });
    });
});
describe("PATCH /users/id with a 201 status code", () => {
    context("when a PATCH request is made to /users/id", () => {
        it("update a user property with a 201 HTTP status", (done) => {
            const updatedUser = {
                username: "carlii"
            };
            chai_1.default.request(URL)
                .patch(usersRoute + '/8')
                .auth(adminTestToken, { type: 'bearer' })
                .send(updatedUser)
                .then((res) => {
                (0, chai_2.expect)(res).to.have.status(201);
                (0, chai_2.expect)(res.body.data.userId).to.be.equals(8);
                (0, chai_2.expect)(res.body.data.firstname).to.be.equals('Carla');
                (0, chai_2.expect)(res.body.data.username).to.be.equals('carlii');
                done();
            }).catch((err) => done(err));
        });
    });
});
describe("PATCH /users/id with a 403 forbidden status code", () => {
    context("when a PATCH request is made to /users/id", () => {
        it("returns a 403 HTTP status", (done) => {
            const updatedUser = {
                username: "carlii"
            };
            chai_1.default.request(URL)
                .patch(usersRoute + '/6')
                .auth(userTestToken, { type: 'bearer' })
                .send(updatedUser)
                .then((res) => {
                (0, chai_2.expect)(res).to.have.status(403);
                done();
            }).catch((err) => done(err));
        });
    });
});
describe("PATCH /users/id with a 404 not found status code", () => {
    context("when a PATCH request is made to /users/id", () => {
        it("returns a 404 HTTP status", (done) => {
            const updatedUser = {
                username: "carlii"
            };
            chai_1.default.request(URL)
                .patch(usersRoute + '/20')
                .auth(adminTestToken, { type: 'bearer' })
                .send(updatedUser)
                .then((res) => {
                (0, chai_2.expect)(res).to.have.status(404);
                done();
            }).catch((err) => done(err));
        });
    });
});
describe("DELETE /users/id with 200 status code", () => {
    context("when a DELETE request is made to /users/id", () => {
        it("deletes a user with a 200 HTTP status", (done) => {
            chai_1.default.request(URL)
                .delete(usersRoute + '/8')
                .auth(adminTestToken, { type: 'bearer' })
                .then((res) => {
                (0, chai_2.expect)(res).to.have.status(200);
                (0, chai_2.expect)(res.body.data.userId).to.be.equals(8);
                (0, chai_2.expect)(res.body.data.firstname).to.be.equals('Carla');
                done();
            }).catch((err) => done(err));
        });
    });
});
describe("DELETE /users/id with a 403 forbidden status code", () => {
    context("when a DELETE request is made to /users/id", () => {
        it("returns a 403 HTTP status", (done) => {
            chai_1.default.request(URL)
                .delete(usersRoute + '/6')
                .auth(userTestToken, { type: 'bearer' })
                .then((res) => {
                (0, chai_2.expect)(res).to.have.status(403);
                done();
            }).catch((err) => done(err));
        });
    });
});
describe("DELETE /users/id with a 404 not found status code", () => {
    context("when a DELETE request is made to /users/id", () => {
        it("returns a 404 HTTP status", (done) => {
            chai_1.default.request(URL)
                .delete(usersRoute + '/25')
                .auth(userTestToken, { type: 'bearer' })
                .then((res) => {
                (0, chai_2.expect)(res).to.have.status(404);
                done();
            }).catch((err) => done(err));
        });
    });
});
describe("GET /users/sortbyalpha", () => {
    context("when a GET request is made to the /users/sortbyalpha route", () => {
        it("returns all users sorted by name", (done) => {
            chai_1.default.request(URL)
                .get(usersRoute + '/sortbyalpha')
                .auth(userTestToken, { type: 'bearer' })
                .then((res) => {
                (0, chai_2.expect)(res.body.data[0].firstname).to.be.equals("Andrea");
                (0, chai_2.expect)(res.body.data[1].firstname).to.be.equals("Bernarda");
                (0, chai_2.expect)(res.body.data[2].firstname).to.be.equals("Daniel");
                done();
            }).catch((err) => done(err));
        });
    });
});
describe("GET /users/sortbyalpha", () => {
    context("when a GET request is made to the /users/sortbyalpha route", () => {
        it("returns all users whose lastnames are in upper case", (done) => {
            chai_1.default.request(URL)
                .get(usersRoute + '/sortbyalpha')
                .auth(userTestToken, { type: 'bearer' })
                .then((res) => {
                (0, chai_2.expect)(res.body.data[0].lastname).to.be.equals("LOPEZ");
                (0, chai_2.expect)(res.body.data[1].lastname).to.be.equals("ESPINOZA");
                (0, chai_2.expect)(res.body.data[2].lastname).to.be.equals("ERAZO");
                done();
            }).catch((err) => done(err));
        });
    });
});
describe("GET /users/abcnames", () => {
    context("when a GET request is made to the /users/abcnames route", () => {
        it("returns all users whose firstnames starts with 'a', 'b' and 'c'", (done) => {
            chai_1.default.request(URL)
                .get(usersRoute + '/abcnames')
                .auth(userTestToken, { type: 'bearer' })
                .then((res) => {
                (0, chai_2.expect)(res.body.data[0].firstname).to.be.equals("Andrea");
                (0, chai_2.expect)(res.body.data[1].firstname).to.be.equals("Bernarda");
                done();
            }).catch((err) => done(err));
        });
    });
});
describe("GET /users/countabc", () => {
    context("when a GET request is made to the /users/countabc route", () => {
        it("returns the number of users whose firstname starts with 'a', 'b' and 'c'", (done) => {
            chai_1.default.request(URL)
                .get(usersRoute + '/countabc')
                .auth(userTestToken, { type: 'bearer' })
                .then((res) => {
                (0, chai_2.expect)(res.body.data.aNames).to.be.equals(1);
                (0, chai_2.expect)(res.body.data.bNames).to.be.equals(1);
                (0, chai_2.expect)(res.body.data.cNames).to.be.equals(0);
                done();
            }).catch((err) => done(err));
        });
    });
});
