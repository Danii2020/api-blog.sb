"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.posts = exports.users = void 0;
const users = [
    {
        name: "Manuel Herrera",
        username: "manu21",
        email: "manuel@gmail.com",
        password: "manu123",
        role: "user"
    },
    {
        name: "Pablo Chicaiza",
        username: "pablo14",
        email: "pablo14@gmail.com",
        password: "paboc123",
        role: "user"
    },
    {
        name: "Santiago Hidalgo",
        username: "santiago13",
        email: "santiago@gmail.com",
        password: "santi123",
        role: "user"
    }
];
exports.users = users;
const posts = [
    {
        title: "Manuel's post",
        content: "This is my first post",
        authorId: 1
    },
    {
        title: "Pablos's post",
        content: "This is my first post",
        authorId: 2
    },
    {
        title: "Santiago's post",
        content: "This is my first post",
        authorId: 3
    }
];
exports.posts = posts;
