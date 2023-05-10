const router = require('express').Router();
const foodService = require('../services/foodService');

const { getErrorMessage } = require('../utils/errorHelpers');
const { isAuth } = require('../middlewares/authMiddleware');
const { preloadMeal, isMealOwner } = require('../middlewares/mealMiddleware');


//----------------------------POST EDIT------------------------------------//
router.put('/edit/:id',
    preloadMeal,
    isMealOwner,
    async (req, res) => {

        try {
            let editResult = await foodService.edit(req.params.id, req.body);
            res.status(202).json(editResult);

        } catch (error) {
            console.error(error.message);
            res.status(400).json({ message: getErrorMessage(error) });
        }
    });

//----------------------------PUT EDIT profile-image------------------------------------//
router.put('/user-edit/:id', isAuth, async (req, res) => {

    const image = { ...req.body }

    try {
        const edited = await foodService.editUserImage(image.image, req.params.id);
        res.status(202).json(edited);

    } catch (error) {
        console.error(error);
        res.status(400).json({ message: getErrorMessage(error) });
    }
});

//----------------------------POST DELETE------------------------------------//
router.delete('/delete/:id',
    isAuth,
    preloadMeal,
    isMealOwner,
    async (req, res) => {

        let meal = req.meal;
        try {
            const result = await foodService.delete(req.params.id);
            if (!result.acknowledged && result.modifiedCount === 0) {
                throw new Error(`Елемент с ID: ${meal._id} не е намерен!`);
            }

            if (meal.isDeleted) {
                throw new Error(`Този елемент вече е изтрит!`)
            }

            res.status(202).end();

        } catch (error) {
            console.error(error.message);
            res.status(404).json({ message: getErrorMessage(error) });
        }
    });
module.exports = router;