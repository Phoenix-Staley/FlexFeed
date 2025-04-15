const router = require('express').Router();
const { Post, User, Comment } = require('../../models');
const with_auth = require('../../utils/auth');

router.post('/', with_auth, async (req, res) => {
    const poster = await User.findByPk(req.session.user_id);

    try {
        if (!req.body.postID || !req.body.content) {
            res.status(400).json({ message: 'Comments need a post ID and a body!' });
            return;
        }

        const new_comment = await Comment.create({
            post_id: req.body.postID,
            content: req.body.content,
            username: poster.fullName,
            created_at: new Date(),
        });

        res.status(201).json(new_comment);
    } catch (err) {
        console.log(err);
        res.status(500).json("Error on the backend");
    }
});

module.exports = router;