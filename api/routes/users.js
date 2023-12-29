const router = require("express").Router();
const User = require("../models/User");
const Post = require("../models/Post");
const verify = require("../verifyToken");
const CryptoJS = require("crypto-js");

//UPDATE
router.put("/:id", verify, async (req, res) => {
    if (req.user.id === req.params.id) {
        if (req.body.password) {
            req.body.password = CryptoJS.AES.encrypt(
                req.body.password,
                process.env.AES_KEY
            ).toString()
        }
        try {
            const updatedUser = await User.findByIdAndUpdate(req.params.id, {
                $set: req.body,
            }, { new: true })
            const { email, password, comments, ...info } = await updatedUser._doc;
            res.status(200).json(info);
        } catch (err) {
            res.status(500).json(err);
        }
    } else {
        res.status(401).json("You can only update your account")
    }

});

//DELETE
router.delete("/:id", verify, async (req, res) => {
    if (req.user.id === req.params.id) {
        try {
            const user = await User.findById(req.params.id);
            if (user) {
                try {
                    await Post.deleteMany({ username: user.username })
                    await User.findByIdAndDelete(req.params.id)
                    res.status(200).json("user has been deleted");
                } catch (err) {
                    res.status(500).json(err)
                }
            } else {
                res.status(404).json("user not found");
            }
        } catch (err) {
            res.status(500).json(err)
        }

    } else {
        res.status(401).json("You can only delete your account")
    }

});

//GET USER
router.get('/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        const { password, ...others } = user._doc;
        res.status(200).json(others)
    } catch (err) {
        res.status(500).json(err)
    }
})

module.exports = router;