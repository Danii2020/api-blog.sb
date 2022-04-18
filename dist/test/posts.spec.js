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
const postsRoute = '/api/v1/posts';
const adminTestToken = config_1.config.adminTestToken;
const userTestToken = config_1.config.userTestToken;
describe("GET /posts with a 200 OK status code", () => {
    context("when a GET request is made to /posts route", () => {
        it("returns all posts with a 200 HTTP status code", (done) => {
            chai_1.default.request(URL)
                .get(postsRoute)
                .then((res) => {
                (0, chai_2.expect)(res).to.have.status(200);
                (0, chai_2.expect)(res.body.data).to.be.an('array');
                (0, chai_2.expect)(res.body.data).length(1);
                done();
            }).catch((err) => done(err));
        });
    });
});
describe("GET /posts/id with a 200 OK status code", () => {
    context("when a GET request is made to /posts route", () => {
        it("returns the post whose id is the correct with a 200 HTTP status code", (done) => {
            chai_1.default.request(URL)
                .get(postsRoute + '/1')
                .then((res) => {
                (0, chai_2.expect)(res).to.have.status(200);
                (0, chai_2.expect)(res.body.data.postId).to.be.equals(1);
                (0, chai_2.expect)(res.body.data.title).to.be.equals("Daniel's post");
                (0, chai_2.expect)(res.body.data.createdAt).to.be.equals("2022-04-14T17:13:40.625Z");
                (0, chai_2.expect)(res.body.data.authorId).to.be.equals(1);
                (0, chai_2.expect)(res.body.data.user.username).to.be.equals("dan");
                done();
            }).catch((err) => done(err));
        });
    });
});
describe("GET /posts/id with a 404 not found status code", () => {
    context("when a GET request is made to /posts route", () => {
        it("returns a 404 HTTP status code", (done) => {
            chai_1.default.request(URL)
                .get(postsRoute + '/50')
                .then((res) => {
                (0, chai_2.expect)(res).to.have.status(404);
                done();
            }).catch((err) => done(err));
        });
    });
});
describe("POST /posts/id with a a 200 OK status code", () => {
    context("when a POST request is made to /posts route", () => {
        it("creates a new post with a 200 HTTP status code", (done) => {
            const newPost = {
                title: "Vanessa's post",
                content: "This is my new post"
            };
            chai_1.default.request(URL)
                .post(postsRoute)
                .auth(userTestToken, { type: 'bearer' })
                .send(newPost)
                .then((res) => {
                (0, chai_2.expect)(res).to.have.status(200);
                (0, chai_2.expect)(res.body.data.postId).to.be.equals(2);
                (0, chai_2.expect)(res.body.data.title).to.be.equals("Vanessa's post");
                (0, chai_2.expect)(res.body.data.authorId).to.be.equals(10);
                done();
            }).catch((err) => done(err));
        });
    });
});
describe("POST /posts/id with a a 401 unauthorized status code", () => {
    context("when a POST request is made to /posts/id route", () => {
        it("returns a 401 HTTP status code", (done) => {
            const newPost = {
                title: "Vanessa's post",
                content: "This is my new post"
            };
            chai_1.default.request(URL)
                .post(postsRoute)
                .send(newPost)
                .then((res) => {
                (0, chai_2.expect)(res).to.have.status(401);
                done();
            }).catch((err) => done(err));
        });
    });
});
describe("PATCH /posts/id with a a 201 status code", () => {
    context("when a PATCH request is made to /posts/id route", () => {
        it("updates the post property with a 201 HTTP status code", (done) => {
            const updatedPost = {
                title: "Vanessa's post version 2"
            };
            chai_1.default.request(URL)
                .patch(postsRoute + '/2')
                .auth(adminTestToken, { type: 'bearer' })
                .send(updatedPost)
                .then((res) => {
                (0, chai_2.expect)(res).to.have.status(201);
                (0, chai_2.expect)(res.body.data.title).to.be.equals("Vanessa's post version 2");
                (0, chai_2.expect)(res.body.data.content).to.be.equals("This is my new post");
                (0, chai_2.expect)(res.body.data.authorId).to.be.equals(10);
                done();
            }).catch((err) => done(err));
        });
    });
});
describe("PATCH /posts/id with a 403 forbidden status code", () => {
    context("when a PATCH request is made to /posts/id route", () => {
        it("returns a 403 HTTP status code", (done) => {
            const updatedPost = {
                title: "Vanessa's post version 2"
            };
            chai_1.default.request(URL)
                .patch(postsRoute + '/2')
                .auth(userTestToken, { type: 'bearer' })
                .send(updatedPost)
                .then((res) => {
                (0, chai_2.expect)(res).to.have.status(403);
                done();
            }).catch((err) => done(err));
        });
    });
});
describe("PATCH /posts/id with a 404 not found status code", () => {
    context("when a PATCH request is made to /posts/id route", () => {
        it("returns a 404 HTTP status code", (done) => {
            const updatedPost = {
                title: "Vanessa's post version 2"
            };
            chai_1.default.request(URL)
                .patch(postsRoute + '/20')
                .auth(adminTestToken, { type: 'bearer' })
                .send(updatedPost)
                .then((res) => {
                (0, chai_2.expect)(res).to.have.status(404);
                done();
            }).catch((err) => done(err));
        });
    });
});
describe("DELETE /posts/id with a 200 OK status code", () => {
    context("when a DELETE request is made to /posts/id route", () => {
        it("deletes the post with a 200 HTTP status code", (done) => {
            chai_1.default.request(URL)
                .delete(postsRoute + '/2')
                .auth(adminTestToken, { type: 'bearer' })
                .then((res) => {
                (0, chai_2.expect)(res).to.have.status(200);
                (0, chai_2.expect)(res.body.data.postId).to.be.equals(2);
                (0, chai_2.expect)(res.body.data.authorId).to.be.equals(10);
                done();
            }).catch((err) => done(err));
        });
    });
});
describe("DELETE /posts/id with a 403 forbidden status code", () => {
    context("when a DELETE request is made to /posts/id route", () => {
        it("returns a 403 HTTP status code", (done) => {
            chai_1.default.request(URL)
                .delete(postsRoute + '/1')
                .auth(userTestToken, { type: 'bearer' })
                .then((res) => {
                (0, chai_2.expect)(res).to.have.status(403);
                done();
            }).catch((err) => done(err));
        });
    });
});
describe("DELETE /posts/id with a 404 not found status code", () => {
    context("when a DELETE request is made to /posts/id route", () => {
        it("returns a 404 HTTP status code", (done) => {
            chai_1.default.request(URL)
                .delete(postsRoute + '/56')
                .auth(adminTestToken, { type: 'bearer' })
                .then((res) => {
                (0, chai_2.expect)(res).to.have.status(404);
                done();
            }).catch((err) => done(err));
        });
    });
});
