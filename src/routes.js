const express = require('express');
const router = express.Router();

const homePageController = require('./controllers/homePageController');
const searchController = require('./controllers/searchController');
const createController = require('./controllers/createController');
const authController = require('./controllers/authController');

router.use((req, res, next) => {
    console.log(`ORIGIN: ${req.get("origin")} - REQUEST: ${req.method} >> PATH: ${req.path}`);
    next();
})
router.use(homePageController);
router.use('/auth', authController);
router.use('/recipe', searchController, createController);
router.get('*', (req, res) => {
    res.status(404).json({ message: 'Invalid API path!' })
});

module.exports = router;