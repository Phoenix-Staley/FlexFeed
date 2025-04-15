const express = require('express');
const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const listEndpoints = require('express-list-endpoints');
const path = require('path');
const sequelize = require('./config/connection');
const { Post, Comment, User } = require('./models');
const routes = require('./routes');
const commentRoutes = require('./routes/backend/commentRoutes');


const app = express();
const PORT = 3001;

// add body parsers before routes
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Session setup
const sessionStore = new SequelizeStore({ db: sequelize });
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
    store: sessionStore
};

app.use(session(sess));

// added all the routes here
app.use('/api/users', require('./routes/backend/userRoutes'));

app.use(express.static("public"));
app.use('/api/comment', commentRoutes);
app.use('/', routes);

//database and start server
sequelize.sync({ alter: true }).then(() => {
    sessionStore.sync();

    app.listen(PORT, () => {
        console.log(`✅ Database synced`);
        console.log(`App listening on port ${PORT}!`);
    });
});
