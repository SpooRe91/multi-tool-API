require('dotenv').config();
const jwt = require('jsonwebtoken');

const SESSION_NAME = process.env.SESSION_NAME;
const secret = process.env.SECRET;

exports.auth = (req, res, next) => {
    let token = req.cookies[SESSION_NAME];

    if (token) {
        jwt.verify(token, secret, ((err, decodedToken) => {
            if (err) {
                return res.clearCookie(SESSION_NAME);
            }
            req.user = decodedToken;
            res.locals.user = decodedToken;
            next();
        }));
    } else {
        next();
    }
};

exports.isAuth = (req, res, next) => {

    if (req.user) {
        next();
    } else {
        res.status(401).json({ message: 'Моля, първо влезте!' });
    }
};

exports.isGuest = (req, res, next) => {

    if (!req.user) {
        next();
    } else {
        res.status(403).json({ message: 'Вече сте влезли!' });
    };
};