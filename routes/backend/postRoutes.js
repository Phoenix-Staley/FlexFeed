const router = require('express').Router();
const { Post, User, Comment } = require('../../models');
const with_auth = require('../../utils/auth');

router.get('/', async (req, res) => {
    const post_data = await Post.findAll({ include: User, order: [['created_at']] });
    res.send(200).json(post_data);
});

router.get('/:postID', async (req, res) => {
    try {
        if (!req.body.title || !req.body.post_body) {
            res.status(400).json({ message: "Posts need a title and a body!" });
        }

        // const post = await Post.findByPk(req.params.postID);
        const post = await Post.findAll({
            include: {
                model: Comment,
                where: {
                    id: req.params.postID
                }
            }
        });

        res.status(201).json(post);
    } catch (err) {
        console.log(err);
        res.status(400).json(err);
    }
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
            comments: [],
            created_at: new Date(),
        });

        res.status(201).json(new_post);
    } catch (err) {
        console.log(err);
        res.status(400).json(err);
    }
});

router.delete('/:postID', with_auth, async (req, res) => {
    try {
        const post = await Post.findByPk(req.params.postID);
        const user = await User.findOne({ where: { username: req.session.username } });

        if (!user.is_admin && !(post.user_id == user.username)) {
            res.status(400).json('You are not authorized to delete this post.');
        }
        else {
            res.status(201).json(post);
        }
    } catch (err) {
        console.log(err);
        res.status(400).json(err);
    }
});

module.exports = router;