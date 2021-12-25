const router = require("express").Router();
const User = require("../models/User");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");

//REGISTER
router.post("/register", async (req, res) => {

    try {
        const passwordEncrypt = CryptoJS.AES.encrypt(
            req.body.password,
            process.env.SECRET_KEY
        ).toString()
        const newUser = new User({ ...req.body, password: passwordEncrypt });
        const user = await newUser.save();
        res.status(200).json(user);
    } catch (err) {
        res.status(500).json(err);
    }
});

//LOGIN
router.post("/login", async (req, res) => {
    try {
        const user = await User.findOne({ username: req.body.username });
        !user && res.status(401).json("Wrong password or username!");

        const passWordArray = CryptoJS.AES.decrypt(user.password, process.env.SECRET_KEY);
        const originalPassword = passWordArray.toString(CryptoJS.enc.Utf8);

        if (originalPassword !== req.body.password) {
            res.status(401).json("Wrong password or username!");
        } else {

            const accessToken = jwt.sign(
                { id: user._id, email: user.email, user: user.username },
                process.env.SECRET_KEY,
                { expiresIn: "5d" }
            );

            const { email, password, comments, ...info } = await user._doc;
            res.status(200).json({ ...info, accessToken });
        }
    } catch (err) {
        res.status(500).json(err);
    }
});


module.exports = router;