const router = require('express').Router();
const { User } = require('../../models');

router.post('/', async (req, res) => {
    // create a new user
    try {
        if (!req.body.username || !req.body.email) {
            res.status(400).json({ message: 'Request body must have a category_name property.' });
            console.log(req.body);
            return;
        }

        const userData = {
            ...req.body,
            bio: '',
            created_at: new Date()
        }

        const newUser = await User.create(userData);
        res.status(201).json(newUser);
    } catch (err) {
        console.log(err);
        res.status(400).json('This username or email is already taken.');
    }
});

router.post('/login', async (req, res) => {
    try {
        // Find the user who matches the posted e-mail address
        let user_data = await User.findOne({ where: { email: req.body.email } });

        if (!user_data) {
            const user_data_username = await User.findOne({ where: { username: req.body.email } });
            if (!user_data_username) {
                res
                    .status(400)
                    .json({ message: 'Incorrect email/username or password, please try again' });
                return;
            }
            user_data = user_data_username;
        }

        // Verify the posted password with the password store in the database
        const valid_password = await user_data.check_password(req.body.password);

        if (!valid_password) {
            res
                .status(400)
                .json({ message: 'Incorrect email/username or password, please try again' });
            return;
        }

        // Create session variables based on the logged in user
        req.session.save(() => {
            req.session.user_id = user_data.id;
            req.session.logged_in = true;

            res.json({ user: user_data, message: 'You are now logged in!' });
        });

    } catch (err) {
        console.log(err);
        res.status(400).json(err);
    }
});

router.post('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.error('Error destroying session:', err);
            return res.status(500).send('Logout failed');
        }
        res.redirect('/login');
    });
})

module.exports = router;