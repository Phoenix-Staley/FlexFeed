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

    try {
        const newComment = await Comment.create({
            post_id: postID,
            username: req.session.username || "Guest",
            content,
            created_at: new Date(),
        });

        res.status(201).json(newComment);
    } catch (err) {
        console.error("Error creating comment:", err);
        res.status(500).json({ message: "Server error", error: err });
    }
});


router.put('/', async (req, res) => {
    const { id, content } = req.body;

    if (!id || !content) {
        return res.status(400).json({ message: "Comment ID and content required." });
    }

    try {
        const updated = await Comment.update(
            { content },
            { where: { id } }
        );

        if (updated[0] === 0) {
            return res.status(404).json({ message: "Comment not found or no changes made." });
        }

        res.status(200).json({ message: "Comment updated." });
    } catch (err) {
        console.error("PUT /api/comment error:", err);
        res.status(500).json({ message: "Server error", error: err });
    }
});


module.exports = router;