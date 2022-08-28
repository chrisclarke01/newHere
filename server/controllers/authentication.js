const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const {
    createJWT,
} = require("../utils/authentication");

const emailRegexp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

exports.signup = (req, res, next) => {
    let { username, email, password, password_confirmation, description, age, gender } = req.body;
    let errors = [];
    if (!username) {
        errors.push({ name: "Username required."});
    }
    if (!email) {
        errors.push({ name: "email required."});
    }
    if (!emailRegexp.test(email)) {
        errors.push({ name: "Invalid email."});
    }
    if (!password) {
        errors.push({ name: "Password required."});
    }
    if (!password_confirmation) {
        errors.push({ name: "Password confirmation required."});
    }
    if (password != password_confirmation) {
        errors.push({ name: "Passwords do not match."});
    }
    if(errors.length > 0) {
        return res.status(422).json({ errors: errors });
    }

    User.findOne({ email: email, username: username })
    .then(user => {
        if(user) {
        return res.status(422).json({ errors: [{ user: "Email or username already in use."}] });
        } else {
            const user = new User({
                username: username,
                email: email,
                password: password,
                description: description,
                age: age,
                gender: gender,
            });

            bcrypt.genSalt(10, function(err, salt) {
                bcrypt.hash(password, salt, function(err, hash) {
                    if (err) throw err;
                    user.password = hash;
                    user.save()
                        .then(response => {
                            res.status(200).json({
                                success: true,
                                result: response,
                            })
                        })
                        .catch(err => {
                            res.status(500).json({
                                errors: [{ error: err }]
                            });
                        });
                });
            });
        }
    }).catch(err => {
        res.status(500).json({
            errors: [{ error: "Something went wrong." }]
        });
    })
}

exports.signin = (req, res) => {
    let { email, password } = req.body;
    let errors = [];

    if(!email) {
        errors.push({ email: "Email required."});
    }
    if(!emailRegexp.test(email)) {
        errors.push({ email: "Invalid email."});
    }
    if(!password) {
        errors.push({ password: "Password required."})
    }
    if(errors.length > 0) {
        return res.status(422).json({ errors: errors });
    }

    User.findOne({ email: email }).then(user => {
        if(!user) {
            return res.status(404).json({
                errors: [{ user: "User not found." }],
            });
        } else {
            bcrypt.compare(password, user.password).then(isMatch => {
                if(!isMatch) {
                    return res.status(400).json({ errors: [{ password: "Incorrect password." }]
                });
                }

                let access_token = createJWT(
                    user.email,
                    user._id,
                    3600
                );
                jwt.verify(access_token, process.env.TOKEN_SECRET, (err, decoded) => {
                    if(err) {
                        res.status(500).json({ errors: err });
                    }
                    if(decoded) {
                        return res.status(200).json({
                            success: true,
                            token: access_token,
                            message: user,
                        });
                    }
                });
            }).catch(err => {
                res.status(500).json({ errors: err });
            });
        }
    }).catch(err => {
        res.status(500).json({ errors: err });
    });
}
