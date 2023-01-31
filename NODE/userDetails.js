const mongoose = require('mongoose');

const UserDetailsSchema = new mongoose.Schema(
    {
        lastname: {
            type: String,
            required: true
        },
        firstname: {
            type: String,
            required: true
        },
        username: {
            type: String,
            required: true,
            unique: true
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true,
            minlength: 6
        },
        phonenumber: {
            type: String,
            required: true
        },
        age: {
            type: String,
            required: true
        }
    },
    {
        collection: "UserInfo",
    }
);

mongoose.model('UserInfo', UserDetailsSchema);