"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const postService_1 = __importDefault(require("../src/services/postService"));
const postService = new postService_1.default();
describe("getAllPosts()", () => {
    context("when the getAllPosts() function is invoked", () => {
        it("returns all the posts in the DB", async () => {
            const posts = await postService.getAllPosts();
            (0, chai_1.expect)(posts).to.be.an('array');
        });
    });
});
