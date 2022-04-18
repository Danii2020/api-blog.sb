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
const profileRoute = '/api/v1/profile';
const adminTestToken = config_1.config.adminTestToken;
const userTestToken = config_1.config.userTestToken;
describe("GET /my-posts with a 200 OK status code", () => {
    context("when a GET request is made to /my-posts route", () => {
        it("returns all the posts of the login user with a 200 HTTP status code", (done) => {
            chai_1.default.request(URL)
                .get(profileRoute + '/my-posts')
                .auth(userTestToken, { type: 'bearer' })
                .then((res) => {
                (0, chai_2.expect)(res).to.have.status(200);
                (0, chai_2.expect)(res.body).to.be.an("array");
                (0, chai_2.expect)(res.body).length(1);
                (0, chai_2.expect)(res.body[0].title).to.be.eqls("Vanessa's post");
                (0, chai_2.expect)(res.body[0].postId).to.be.equals(5);
                done();
            }).catch((err) => done(err));
        });
    });
});
describe("GET /my-posts with a 401 unauthorized status code", () => {
    context("when a GET request is made to /my-posts route", () => {
        it("returns a 401 HTTP status code", (done) => {
            chai_1.default.request(URL)
                .get(profileRoute + '/my-posts')
                .then((res) => {
                (0, chai_2.expect)(res).to.have.status(401);
                done();
            }).catch((err) => done(err));
        });
    });
});
