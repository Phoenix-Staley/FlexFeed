const express = require('express');
const session = require('express-session');
const routes = require('./controllers');

class User {
    constructor(username) {
        this.posts = [];
        this.username = username;
        this.nickname = username;
    }
}

class Comment {
    constructor(author, postId, content) {
        this.author = author;
        this.postId = postId;
        this.content = content;
        this.publishDate = new Date();
    }
}

class Post {
    constructor(title, imageSrc, body, author) {
        this.title = title;
        this.imageSrc = imageSrc;
        this.body = body;
        this.author = author;
        this.publishDate = new Date();
        this.comments = [];
    }
}

let posts = [];

for (let i = 0; i < 10; i++) {
    posts.push(new Post(
        "Example Title",
        "",
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi ipsum dolor, bibendum porttitor sem quis, viverra laoreet ipsum. Cras eu lacus ac eros consectetur dapibus. Morbi aliquam maximus augue vitae imperdiet. Suspendisse efficitur egestas ipsum, quis tristique magna iaculis ut. Quisque viverra condimentum felis consequat lobortis.",
        new Account("Rick")
    ));
}

