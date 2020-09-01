const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/user');

const router = express.Router();


router.post("", (req, res, next) => {
    bcrypt.hash(req.body.password, 10)
        .then(hashPass => {
            const user = new User({
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                email: req.body.email,
                password: hashPass,
                type: 'basic'
            });
            user.save()
                .then(() => {
                    res.status(200).json({
                        message: 'User added successfully!'
                    });
                })
                .catch(err => {
                    res.status(500).json({
                        error: err
                    });
                });
                
        })
});


router.post("/login", (req, res, next) => {
    let fetchedUser;
    User.findOne({ email: req.body.email })
        .then(user => {
            if (!user) { 
                return res.status(401).json({
                    message: "User does not exist"
                });
            }
            fetchedUser = user;
            return bcrypt.compare(req.body.password, user.password);
        })
        .then(passwordCorrect => {
            if (!passwordCorrect) {
                return res.status(401).json({
                    message: "Incorrect password"
                });
            }
            //password is correct; create jwt
            const token = jwt.sign(
                { email: fetchedUser.email, userId: fetchedUser._id }, 
                'secret_should_be_very_long', 
                { expiresIn: '12h' } 
            );
            res.status(200).json({
                token: token,
                expiresIn: 43200,
                userType: fetchedUser.type,
                message: 'Login successfull'
            });
        })
        .catch(err => {
            return res.status(401).json({
                message: "Login failed"
            });
        });
});


router.get("", (reg, res, next) => {
    User.find()
        .then(fetchedUsers => {
            res.status(200).json({
                users: fetchedUsers
            });
        })
        .catch(err => {
            return res.status(500).json({
                message: "Something went wrong"
            });
        });
});


router.delete("/:id", (req, res, next) => {
    User.deleteOne({ _id: req.params.id })
        .then(() => {
            res.status(200).json({
                message: 'User is deleted successfully'
            });
        })
        .catch(err => {
            console.log(err);
        });
});


module.exports = router;