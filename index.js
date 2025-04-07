const express = require('express');
const listEndpoints = require('express-list-endpoints');
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

const app = express();
const PORT = 3001;

const sess = {
    secret: 'Super secret secret',
    logged_in: false,
    cookie: {
        maxAge: 3600000,
        httpOnly: true,
        sameSite: 'strict'
    },
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
        db: sequelize
    })
};

app.use(session(sess));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(routes);
app.use(express.static("public"));

app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}!`)
    console.log(`Available endpoints:${listEndpoints(app).map((endpoint) => " " + endpoint.path)}`)
});