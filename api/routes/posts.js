const router = require("express").Router();
const Post = require("../models/Post");
const User = require("../models/User");
const verify = require("../verifyToken");

//CREATE
router.post("/", verify, async (req, res) => {
    const newPost = new Post(req.body);
    try {
        const savedPost = await newPost.save();
        res.status(200).json(savedPost)
    } catch (err) {
        res.status(500).json(err)
    }

});

//UPDATE
router.put("/:id", verify, async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (post.username === req.user.user) {
            try {
                const updatedPost = await Post.findByIdAndUpdate(req.params.id, { $set: req.body },
                    { new: true })
                res.status(200).json(updatedPost);
            } catch (err) {
                res.status(500).json(err)
            }
        } else {
            res.status(401).json("You can only update your own post")
        }
    } catch (err) {
        res.status(500).json(err)
    }

});

//DELETE
router.delete("/:id", verify, async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (post.username === req.user.user) {
            try {
                await post.deleteOne();
                res.status(200).json("Post has been deleted")
            } catch (err) {
                res.status(500).json(err)
            }
        } else {
            res.status(401).json("You can only delete your post")
        }
    } catch (err) {
        res.status(500).json(err)
    }
});

//GET
router.get('/:id', async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);

        let ids = new Set();

        post.comments.forEach((main) => {
            // !ids.includes(main.userId) && ids.push(main.userId)
            ids.add(main.userId);
            main.subcomments.forEach((sub) => {
                // !ids.includes(main.userId) && ids.push(sub.userId)
                ids.add(sub.userId)
            })
        })

        const userInfo = await User.find({ '_id': { $in: Array.from(ids) } }, { profilePic: 1, username: 1 });


        post.comments.forEach((main, i) => {
            main.subcomments.forEach((sub, ii) => {
                post.comments[i].subcomments[ii].userId = JSON.stringify(userInfo.find(({ _id }) => _id == sub.userId))
                // newComments[i].subcomments[ii].userId= userInfo.find(({ _id }) => _id == sub.userId)
            })
            post.comments[i].userId = JSON.stringify(userInfo.find(({ _id }) => _id == main.userId))
            // newComments[i].userId= userInfo.find(({ _id }) => _id == main.userId)
        })

        res.status(200).json(post)
    } catch (err) {
        res.status(500).json(err)
    }
})

//GET ALL
router.get('/', async (req, res) => {
    const username = req.query.user
    const catName = req.query.cat;
    try {
        let posts;
        if (username) {
            posts = await Post.find({ username }, { comments: 0 })
        } else if (catName) {
            posts = await Post.find({ categories: { $in: [catName] } }, { comments: 0 })
        } else {
            posts = await Post.find({}, { comments: 0 })
        }
        res.status(200).json(posts)
    } catch (err) {
        res.status(500).json(err)
    }
})
router.get('/dg/ids', async (req, res) => {
    try {
        let posts = await Post.find({}, '_id')

        res.status(200).json(posts)
    } catch (err) {
        res.status(500).json(err)
    }
})

//////////////////////// COMMENTS /////////////////////////////
router.post("/comment/:id", verify, async (req, res) => {
    try {
        if (req.query.main) {
            const newPost = await Post.findByIdAndUpdate(
                { _id: req.params.id },
                { $push: { [`comments.${req.query.main}.subcomments`]: { comment: req.body.comment, userId: req.user.id } } }, { new: true, timestamps: false }
            );
            res.status(200).json(newPost.comments[parseInt(req.query.main)].subcomments[newPost.comments[parseInt(req.query.main)].subcomments.length - 1])
        } else {
            const newPost = await Post.findByIdAndUpdate(
                { _id: req.params.id },
                { $push: { comments: { updatedAt: new Date(), createdAt: new Date(), comment: req.body.comment, userId: req.user.id } } }, { new: true, timestamps: false }
            );
            res.status(200).json(newPost.comments[newPost.comments.length - 1])
        }

    } catch (err) {
        res.status(500).json(err)
    }

});

router.put("/comment/:id", verify, async (req, res) => {
    try {
        if (req.query.sub) {
            const newPost = await Post.findByIdAndUpdate(
                { _id: req.params.id },
                {
                    $set: {
                        [`comments.${req.query.main}.subcomments.${req.query.sub}.comment`]: req.body.comment
                    }
                }, { new: true, timestamps: false }
            );
            res.status(200).json(newPost.comments[req.query.main].subcomments[req.query.sub])
        } else {

            const newPost = await Post.findByIdAndUpdate(
                { _id: req.params.id },
                {
                    $set: {
                        [`comments.${req.query.main}.updatedAt`]: new Date(),
                        [`comments.${req.query.main}.comment`]: req.body.comment
                    }
                }, { new: true, timestamps: false }
            );
            res.status(200).json(newPost.comments[req.query.main])
        }

    } catch (err) {
        res.status(500).json(err)
    }

});


router.delete("/comment/:id", verify, async (req, res) => {
    try {
        let main = parseInt(req.query.main)
        if (req.query.sub) {
            let sub = parseInt(req.query.sub)
            const newPost = await Post.findByIdAndUpdate(
                { _id: req.params.id }, [{
                    $set: {
                        comments: {
                            $let: {
                                vars: {
                                    lastPart: { $slice: ["$comments", main + 1, { $size: "$comments" }] },
                                    firstPart: { $slice: ["$comments", main] },
                                    editedComment: { $arrayElemAt: ['$comments', main] }
                                }, in: {
                                    $concatArrays: ['$$firstPart', [{
                                        $setField: {
                                            field: 'subcomments',
                                            input: "$$editedComment",
                                            value: {
                                                $concatArrays: [
                                                    { $slice: ["$$editedComment.subcomments", sub] },
                                                    {
                                                        $slice: ["$$editedComment.subcomments", sub + 1,
                                                            { $size: "$$editedComment.subcomments" }
                                                        ]
                                                    }
                                                ]
                                            }
                                        }
                                    }], '$$lastPart']
                                }
                            }
                        }
                    }
                }], { new: true, timestamps: false }
            );
            res.status(200).json(newPost.comments[req.query.main].subcomments)
        } else {
            const newPost = await Post.findByIdAndUpdate(
                { _id: req.params.id }, [{
                    $set: {
                        comments:
                        {
                            $concatArrays: [
                                { $slice: ["$comments", main] },
                                { $slice: ["$comments", 1 + main /*{ $add: [1, main] }*/, { $size: "$comments" }] }
                            ]
                        }
                    }
                }], { new: true, timestamps: false }
            );
            res.status(200).json(newPost.comments)
        }
    } catch (err) {
        res.status(500).json(err)
    }
});

module.exports = router;