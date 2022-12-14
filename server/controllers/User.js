const User = require("../models/User");
const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs")

router.get('/int', async (req, res) => {
    const token =req.query.token;
    let user = null;
    let response;
    
    try {
        const userData = jwt.verify(token, 'app');
        user =  await User.findById(userData.userId);
        
    } catch (e) {
        response = null;
    }

    if (user) {
        response = user;
    }

    res.send({user: response});
});

router.post('/register', async (req, res) => {
    const userExists = await User.find({email: req.body.email});
    if (userExists) {
        return res.status(400).send({
            message: 'User already exists!'
        });
    }


    const newUser = User({
        name: req.body.name,
        email: req.body.mail,
        password: req.body.password,
        role: 'user'

    });

    await newUser.save();

    return res.sendStatus(201);
});

router.post('/login', async (req, res) =>{
    const user = await User.find({email: req.body.email});
    if (!user) {
        return res.status(400).send( {
            message: 'User does not exist'
        })
    }

    const passwordIsEqual = await bcrypt.compare(req.body.password, user.password);
    if(!passwordIsEqual) {
        return res.status(401).send({
            message: 'Incorrect password'
        });
    }


    const token = jwt.sign({userId: user._id}, 'app')

    res.send({
        user, 
        token
    })
});

module.exports = router;