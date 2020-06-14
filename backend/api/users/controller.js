const User = require('./model');
const Transit = require('../transits/model');
const {registerValidation, loginValidation, updateValidation} = require('./validation')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const config = require("../../config");

const create = async (req, res) => {

    const {error} = registerValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const nameExist = await User.findOne({name: req.body.name});
    if (nameExist) return res.status(409).send("Name already exists");

    const emailExist = await User.findOne({email: req.body.email});
    if (emailExist) return res.status(409).send("E-mail is occupied");

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword
    });

    try {
        const savedUser = await user.save();
        res.send(savedUser);
    } catch (err) {
        await res.json(err.message);
    }
};

const login = async (req, res) => {

    const {error} = loginValidation(req.body);
    if (error) return res.status(401).send(error.details[0].message);

    const user = await User.findOne({name: req.body.name});
    if (!user) return res.status(401).send("Name is not found");

    const validPass = await bcrypt.compare(req.body.password, user.password);
    if (!validPass) return res.status(401).send('invalid password');

    //create token
    const token = jwt.sign({_id: user._id}, process.env.JWT_SECRET, {expiresIn: 1000 * 60 * 30});
    res.cookie('jwt', token, config.cookiesOptions);

    const salt = await bcrypt.genSalt(10);
    const token2 = bcrypt.hash(token, salt);
    res.cookie('jwt2', token2);

    return res.send({id: user._id, name: user.name, token: token});
};


const showMe = async (req, res, next) => {
    try {
        const user = await User.findOne({_id: req.user});
        if (user) return res.status(200).json(user);
        return res.status(404).send("User not found");
    } catch (err) {
        await res.json(err.message);
    }

};

const update = async (req, res) => {
    try {
        const {error} = updateValidation(req.body);
        if (error) return res.status(400).send(error.details[0].message);
        const updatedUser = await User.findOne({_id: req.user});
        if (updatedUser) {
            if (req.body.name) {
                updatedUser.name = req.body.name;
            }
            if (req.body.password) {
                const salt = await bcrypt.genSalt(10);
                const hashedPassword = await bcrypt.hash(req.body.password, salt);
                updatedUser.password = hashedPassword;
            }
            await updatedUser.save();
            return await res.json(updatedUser);
        } else {
            return res.status(404).send("User not found");
        }
    } catch (err) {
        await res.json(err.message);
    }
};

const destroy = async (req, res) => {
    try {
        const removedUser = await User.findOne({_id: req.user})
        if (removedUser) {
            await res.json(removedUser);
            await removedUser.remove();
            return res.status(204).end();
        }
        return res.status(404).end();
    } catch (err) {
        await res.json(err.message);

    }
};

module.exports = {
    create, login, showMe, update, destroy
};
