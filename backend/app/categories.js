const router = require('express').Router();
const Category = require('../models/Category');
const authMiddleware = require('../middlewares/authMiddleware');
const permit = require('../middlewares/permit');

router.get('/', async (req, res) => {
    try {
        const categories = await Category.find().select('title');
        if(categories.length === 0) return res.status(404).send({error: 'Ни одной категории еще не созданно'});
        return res.send(categories);
    } catch (e) {
        return res.status(500).send({error: 'Eternal Server Error'});
    }
});

router.get('/:id', async (req, res) => {
    try {
        const category = await Category.findById(req.params.id).select('title').lean();

        if(!category) return res.status(404).send({error: 'Категория не найдена'});
        return res.send(category);
    } catch (e) {
        return res.status(500).send({error: 'Eternal Server Error'});
    }
});

router.post('/', [authMiddleware, permit('admin')], async (req, res) => {
    try {
        const category = new Category({title: req.body.title});
        await category.save();
        return res.send({message: `Категория ${category.title} создана`});
    } catch (e) {
        return res.status(400).send(e);
    }
});

router.put('/:id', [authMiddleware, permit('admin')], async (req, res) => {
    try {
        const category = await Category.findOneAndUpdate(
            {_id: req.params.id},
            {title: req.body.title});
        if(!category) return res.status(404).send({error: 'Редактируемая категория не найдена'});
        return res.send({message: `Категория "${category.title}" отредактирована`});
    } catch (e) {
        return res.status(400).send(e);
    }
});

router.delete('/:id', [authMiddleware, permit('admin')], async (req, res) => {
    try {
        const category = await Category.findOneAndRemove({_id: req.params.id});
        if(!category) return res.status(404).send({error: 'Категория не найдена'});
        return res.send({message: `Категория "${category.title}" удалена`});
    } catch (e) {
        return res.status(400).send(e);
    }
});

module.exports = router;