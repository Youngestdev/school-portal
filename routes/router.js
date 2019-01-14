const express = require("express");
const bodyParser = require("body-parser");
const router = express.Router();
const User = require("../models/user");
const nodemailer = require("nodemailer")

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({
    extended: true
}));

// GET route for home page

router.get("/", function(req, res) {
    res.render("home", {
        title: "Home "
    });
});
//POST route for user registration and  logging in..
router.post("/profile", (req, res, next) => {
    if (req.body.email &&
        req.body.regno &&
        req.body.password
    ) {

        const userData = {
            email: req.body.email,
            regno: req.body.regno,
            password: req.body.password,
        }

        // create user from passed data.
        User.create(userData, (error, user) => {
            if (error) {
                return next(error);
            } else {
                req.session.userId = user._id;
                return res.render("profile", {
                    regno: user.regno,
                    useremail: user.email
                });
            }
        });

        // if its a login request , then take him to his profile page
    } else if (req.body.email && req.body.password) {
        User.authenticate(req.body.email, req.body.password, (error, user) => {
            if (error || !user) {
                const err = new Error("Wrong email or password.");
                err.status = 401;
                return res.render("loginerr");
            } else {
                // otherwise if the user is logged in and wants to visit his profile page directly from url argument .
                req.session.userId = user._id;
                return res.render("profile", {
                    regno: user.regno,
                    useremail: user.email,
                });
            }
        });
    } else {
        // if user ongoing registration us leaving some fields empty send the warning !
        const err = new Error("All fields are required.");
        err.status = 400;
        return next(err);
    }
})

// GET route for profile page
router.get("/profile", (req, res, next) => {
    // check if the user is logged in by checking session id.
    User.findById(req.session.userId)
        .exec((error, user) => {
            // if he is not. execute !
            if (error) {
                return next(error);
            } else if (user === null) {
                const err = new Error("Not authorized! Go back!");
                err.status = 400;
                // next(err);
                return res.render("login");
            } else {
                return res.render("profile", {
                    regno: user.regno ,
                    useremail: user.email,
                });
            }
        });
});


// GET for logout
router.get("/logout", (req, res, next) => {
    if (req.session) {
        // delete session object
        req.session.destroy((err) => {
            if (err) {
                return next(err);
            } else {
                return res.redirect("/");
            }
        });
    }
});


router.get("/login", (req, res) => {
    res.render("login", {
        title: "Login"
    });
});

router.get("/register", (req, res) => {
    res.render("register", {
        title: "Registration"
    });
});

router.use("/profile", (req, res) => {
    res.render("profile", {
        regno: user.regno,
        useremail: user.email,
        userpass: user.password
    });
});


router.use((req, res) => {
    res.status(404);
    res.render("404");
});

// Let"s begin !!
module.exports = router;
