const router = require('express').Router();
const { Post, User, Comment } = require('../../models');
const with_auth = require('../../utils/auth');

router.get('/', async (req, res) => {
    const post_data = await Post.findAll({ include: User, order: [['created_at']] });
    res.send(200).json(post_data);
});

router.get('/:postID', async (req, res) => {

});

router.post('/', with_auth, async (req, res) => {
    try {
        if (!req.body.title || !req.body.post_body) {
            res.status(400).json({ message: 'Posts need a title and a body!' });
        }

        const new_post = await Post.create({
            title: req.body.title,
            content: req.body.body,
            media: req.body.media,
            user_id: req.session.username,
            created_at: new Date(),
        });

        res.status(201).json(new_post);
    } catch (err) {
        console.log(err);
        res.status(400).json(err);
    }
});

router.delete('/', with_auth, async (req, res) => {

});

module.exports = router;