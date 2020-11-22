const router = require('express').Router();
const Category = require('../models/Category');
const authMiddleware = require('../authMiddleware');

router.get('/', async (req, res) => {
    try {
        const categories = await Category.find();
        if(categories.length === 0) return res.status(404).send({error: 'Ни одной категории еще не созданно'});
        return res.send(categories);
    } catch (e) {
        return res.status(500).send({error: 'Eternal Server Error'});
    }
});

router.post('/', authMiddleware, async (req, res) => {
    try {
        const category = new Category(req.body);
        await category.save();
        return res.send(category);
    } catch (e) {
        return res.status(400).send(e);
    }
});

router.put('/:id', authMiddleware, async (req, res) => {
    try {
        const updatedCategory = await Category.findOneAndUpdate({_id: req.params.id}, {...req.body}, {new: true});
        if(!updatedCategory) return res.status(404).send({error: 'Редактируемая категория не найдена'});
        return res.send(updatedCategory);
    } catch (e) {
        return res.status(400).send(e);
    }
});

router.delete('/:id', authMiddleware, async (req, res) => {
    try {
        const category = await Category.findOneAndRemove({_id: req.params.id});
        if(!category) return res.status(404).send({error: 'Категория не найдена'});
        return res.send({message: `Категория "${category.title}" удалена`});
    } catch (e) {
        return res.status(400).send(e);
    }
});

module.exports = router;