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
const authRoute = '/api/v1/auth';
const adminTestToken = config_1.config.adminTestToken;
const userTestToken = config_1.config.userTestToken;
describe("POST /signup with 200 OK status code", () => {
    context("when a POST request is made to /signup route", () => {
        it("create a new user with a 200 HTTP status code", (done) => {
            const newUser = {
                firstname: "Vanessa",
                lastname: "Rodriguez",
                username: "vanee",
                email: "vanessa@gmail.com",
                password: "vanessa123"
            };
            chai_1.default.request(URL)
                .post(authRoute + "/signup")
                .send(newUser)
                .then((res) => {
                (0, chai_2.expect)(res).to.have.status(200);
                (0, chai_2.expect)(res.body.data.userId).to.be.equals(10);
                (0, chai_2.expect)(res.body.data.firstname).to.be.equals('Vanessa');
                (0, chai_2.expect)(res.body.data.email).to.be.equals("vanessa@gmail.com");
                done();
            }).catch((err) => done(err));
        });
    });
});
describe("POST /login with 200 OK status code", () => {
    context("when a POST request is made to /login route", () => {
        it("login the user with a 200 HTTP status code", (done) => {
            const loginCredentials = {
                email: "vanessa@gmail.com",
                password: "vanessa123"
            };
            chai_1.default.request(URL)
                .post(authRoute + "/login")
                .send(loginCredentials)
                .then((res) => {
                (0, chai_2.expect)(res).to.have.status(200);
                (0, chai_2.expect)(res.body.user.userId).to.be.equals(10);
                (0, chai_2.expect)(res.body.user.firstname).to.be.equals('Vanessa');
                (0, chai_2.expect)(res.body.user.lastname).to.be.equals("Rodriguez");
                (0, chai_2.expect)(res.body.token).to.be.a("string");
                (0, chai_2.expect)(res.body.token).length(159);
                done();
            }).catch((err) => done(err));
        });
    });
});
describe("POST /login with 401 status code", () => {
    context("when a POST request is made to /login route", () => {
        it("does not login the user and returns a 401 HTTP status code", (done) => {
            const badLoginCredentials = {
                email: "vanessa1@gmail.com",
                password: "vanessa1234"
            };
            chai_1.default.request(URL)
                .post(authRoute + "/login")
                .send(badLoginCredentials)
                .then((res) => {
                (0, chai_2.expect)(res).to.have.status(401);
                done();
            }).catch((err) => done(err));
        });
    });
});
