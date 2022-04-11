"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.posts = exports.users = void 0;
const users = [
    {
        name: "Manuel Herrera",
        username: "manu21",
        email: "manuel@gmail.com"
    },
    {
        name: "Pablo",
        username: "pablo14",
        email: "pablo@gmail.com"
    },
    {
        name: "Santiago",
        username: "santiago13",
        email: "santiago@gmail.com"
    }
];
exports.users = users;
const posts = [
    {
        title: "Manuel's post",
        content: "This is my first post",
        authorId: 3
    },
    {
        title: "Pablos's post",
        content: "This is my first post",
        authorId: 4
    },
    {
        title: "Santiago's post",
        content: "This is my first post",
        authorId: 5
    }
];
exports.posts = posts;
