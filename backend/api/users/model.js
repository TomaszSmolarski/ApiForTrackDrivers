const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = mongoose.Schema({
    name: {
        type: String,
        unique: true,
        required: true,
        minlength: 6
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    email: {
        type: String,
        unique: true,
        required: true
    }
}, {
    timestamps: true,
    toJSON: {
        transform: (obj, ret) => {
            delete ret['__v']
        }
    }
});

module.exports = mongoose.model('user', UserSchema);
