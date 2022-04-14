"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = __importDefault(require("chai"));
const chai_http_1 = __importDefault(require("chai-http"));
const config_1 = require("../config/config");
chai_1.default.use(chai_http_1.default);
const URL = 'http://localhost:3000';
const testToken = config_1.config.testToken;
describe("API CRUD", () => {
    describe("GET /users", () => {
        context("when a GET request is made to the API", () => {
            it("returns all the users", (done) => {
                chai_1.default.request(URL)
                    .get('/api/v1/users')
                    .auth(testToken, { type: 'bearer' })
                    .then((res) => {
                    chai_1.default.expect(res).to.have.status(200);
                    done();
                }).catch((err) => done(err));
            });
        });
    });
});
