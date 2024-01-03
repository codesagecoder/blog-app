const express = require('express');
const app = express();
const dotenv = require('dotenv')
const mongoose = require('mongoose');
const authRoute = require('./routes/auth');
const userRoute = require("./routes/users")
const postsRoute = require("./routes/posts")
const categoriesRoute = require("./routes/categories")
const verify = require("./verifyToken");
const multer = require('multer');
const cors = require("cors");
const path = require("path");
const fs = require('fs')

dotenv.config();
app.use(cors());
app.use(express.json())
app.use('/images', express.static(path.join(__dirname, "/images")))
// app.use(express.static("images"));

mongoose.connect(
    process.env.MONGO_URL || 'mongodb://localhost:27017/blog')
    .then(console.log("Connected to MongoDB")).catch(err => console.log(err))

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'images/user-content')
    }, filename: (req, file, cb) => {
        cb(null, req.body.name)
    }
})

const upload = multer({ storage: storage, limits: { fileSize: 2000_000 /* 2MB */ } })

app.post('/api/upload', verify, upload.single("file"), (req, res) => {
    res.status(200).json({ url: `/${req.file.destination}/${req.file.filename}` });
})

app.delete('/api/upload', verify, async (req, res) => {
    if (!req.query.path) {
        return res.status(422).json('failed to delete.');
    }

    fs.unlink(path.join(__dirname, req.query.path), (err) => {
        if (err) {
            res.status(409).json('failed to delete.');
        }
        else {
            res.status(200).json("File has been removed");
        }
    });
})

app.use('/api/auth', authRoute);
app.use('/api/users', userRoute);
app.use('/api/posts', postsRoute);
app.use('/api/categories', categoriesRoute);

var appListen = app.listen(process.env.PORT || 3001, () => {
    console.log('backend is running')
})

const io = require('socket.io')(appListen)

io.on("connection", socket => {
    var room = socket.handshake['query']['postId'];
    socket.join(room);

    socket.on('disconnect', function () {
        socket.leave(room)
    });
    socket.on('unmount', function () {
        socket.disconnect()
    });
    socket.on('editor', function (data) {

        socket.to(room).emit('editor', data);
    });
})
