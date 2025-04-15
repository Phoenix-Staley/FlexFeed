const router = require('express').Router();
const { Post, User, Comment } = require('../../models');
const with_auth = require('../../utils/auth');

router.get('/', async (req, res) => {
    const post_data = await Post.findAll({ order: [['created_at']] });
    res.status(200).json(post_data);
});

router.get('/:postID', async (req, res) => {
    try {
        // const post = await Post.findByPk(req.params.postID);
        let post = await Post.findByPk(req.params.postID);

        if (!post) {
            res.status(404).send("No post with that ID found");
            return;
        }

        post = { ...post.dataValues, comments: [] };

        const comments = await Comment.findAll({
            where: {
                post_id: req.params.postID,
            }
        });

        post.comments = comments;

        res.status(201).json(post);
    } catch (err) {
        console.log(err);
        res.status(400).json(err);
    }
});

router.post('/', with_auth, async (req, res) => {
    const poster = await User.findByPk(req.session.user_id);

    try {
        if (!req.body.title || !req.body.post_body) {
            res.status(400).json({ message: 'Posts need a title and a body!' });
            return;
        }

        const new_post = await Post.create({
            title: req.body.title,
            content: req.body.post_body,
            media: req.body.media,
            username: poster.fullName,
            comments: [],
            created_at: new Date(),
        });

        res.status(201).json(new_post);
    } catch (err) {
        console.log(err);
        res.status(500).json("Error occured on the backend");
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