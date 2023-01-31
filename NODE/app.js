const express = require('express');
const app = express();
const mongoose = require('mongoose');
app.use(express.json());
const cors = require('cors');
app.use(cors());
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const JWT_SECRET = "sdhafsdjglkd()sd][]eqnqktgdfgvvbfhjoifjsoiaojuoij3435yf[f[f[d";

const mongoUrl = "mongodb+srv://saisrikanth18:srikanth143@cluster0.kfhj1al.mongodb.net/?retryWrites=true&w=majority";

mongoose.connect(mongoUrl, {
    useNewUrlParser: true
})
    .then(() => {
        console.log("Connected to database");
    })
    .catch((e) => console.log(e));


app.listen(5000, () => {
    console.log("Server Started")
});

require("./userDetails");

const User = mongoose.model('UserInfo');

app.post("/register", async (req, res) => {
    const { firstname, lastname, username, email, password, phonenumber, age } = req.body;

    const encryptedPassword = await bcrypt.hash(password, 10);
    try {
        const oldUser = await User.findOne({ username });
        if (oldUser) {
            return res.json({ error: "User Exists" })
        }
        await User.create({
            firstname,
            lastname,
            username,
            email,
            password: encryptedPassword,
            phonenumber,
            age
        });
        res.send({ status: 'Ok' });
    }
    catch (error) {
        res.send({ status: 'error' });
    }
});


app.post("/login-user", async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) {
        return res.json({ error: "User not found" });
    }
    if (await bcrypt.compare(password, user.password)) {
        const token = jwt.sign({username: user.username}, JWT_SECRET);

        if (res.status(201)) {
            return res.json({ status: 'Ok', data: token })
        } else {
            return res.json({ error: 'error' })
        }
    }
    res.json({ status: 'error', error: 'Invalid Password' });
})


app.post("/userData", async (req, res) => {
    const { token } = req.body;
    try {
        const user = jwt.verify(token, JWT_SECRET);
        console.log(user);
        const userId = user.username;
        User.findOne({ username: userId })
            .then((data) => {
                res.send({ status: 'Ok', data: data })
            })
            .catch((error) => {
                res.send({ status: 'error', data: error })
            })
    } catch (error) {

    }
})