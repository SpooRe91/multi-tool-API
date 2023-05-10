const router = require('express').Router();
const foodService = require('../services/foodService');
const { preloadMeal } = require('../middlewares/mealMiddleware');
const { getErrorMessage } = require('../utils/errorHelpers');
const { isAuth } = require('../middlewares/authMiddleware');

router.get('/', async (req, res) => {
    res.status(200).json(`Добре дошли в "Cook-Blog" API, моля посетете този линк, за README файл
    : https://github.com/SpooRe91/react-js-project-final/blob/main/Cook-Blog-readme.md , to download the API documentation! `);
})

//----------------------------GET DETAILS------------------------------------//
router.get('/details/:id',
    preloadMeal,
    (req, res) => {
        const meal = req.meal;
        res.json(meal);
    });
//----------------------------GET LIKES------------------------------------//

router.get('/like/:id', preloadMeal, async (req, res) => {

    const meal = req.meal;

    if (!meal.likes.find(x => x === req.user._id)) {
        try {
            await foodService.addLike(meal._id, req.user._id);
            res.status(202).json({ messag: "Добавено харесване!" }).end();
        } catch (error) {
            console.error(error);
            res.status(400).json({ message: getErrorMessage(error) });
        }
    } else {
        res.status(400).json({ message: "Вече сте харесали това!" });
    }
});


//----------------------------GET USER profile------------------------------------//
router.get('/user-get/:id', isAuth, async (req, res) => {

    try {

        const user = await foodService.getUser(req.params.id);

        if (user) {
            res.status(200).json(user);
        } else {
            throw new Error("Няма такъв потребител!")
        }

    } catch (error) {
        console.error(error.message);
        res.status(400).json({ message: getErrorMessage(error) });
    }
});

module.exports = router;