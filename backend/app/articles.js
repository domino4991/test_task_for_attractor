const router = require('express').Router();
const multer = require('multer');
const path = require('path');
const {nanoid} = require('nanoid');
const config = require('../config');
const authMiddleware = require('../middlewares/authMiddleware');
const permit = require('../middlewares/permit');

const Article = require('../models/Article');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, config.uploadPath);
    },
    filename: (req, file, cb) => {
        cb(null, nanoid() + path.extname(file.originalname));
    }
});

const upload = multer({storage});

router.get('/', async (req, res) => {
    let articles;
    try {
        if(req.query.category) {
            articles = await Article
                .find({category_id: req.query.category})
                .populate('category_id')
                .populate('user_id', 'username -_id')
                .limit(20);
        } else {
            articles = await Article
                .find()
                .populate('category_id')
                .populate('user_id', 'username -_id')
                .limit(20);
        }
        if(articles.length === 0) return res.status(404).send({error: 'Ни одной новости еще не добавлено'});
        return res.send(articles);
    } catch (e) {
        return res.status(500).send({error: 'Eternal Server Error'});
    }
});

router.get('/:id', async (req, res) => {
    try {
        const article = await Article
            .findById(req.params.id)
            .populate('category_id')
            .populate('user_id', 'username -_id');
        if(!article) return res.status(404).send({error: 'Новость не найдена'});
        return res.send(article);
    } catch (e) {
        return res.status(500).send({error: 'Eternal Server Error'});
    }
});

router.post('/', [authMiddleware, permit('admin')], upload.single('image'), async (req, res) => {
    try {
        const article = new Article({
            title: req.body.title,
            description: req.body.description,
            category_id: req.body.category
        });
        if(req.file) {
            article.image = req.file.filename;
        }
        article.user_id = req.user._id;
        await article.save();
        return res.send({message: 'Новость создана'});
    } catch (e) {
        return res.status(400).send(e);
    }
});

router.put('/:id', [authMiddleware, permit('admin')], upload.single('image'), async (req, res) => {
    try {
        if(req.file) {
            req.body.image = req.file.filename;
        }
        const updatedArticle = await Article.findOneAndUpdate({
            _id: req.params.id
        }, {...req.body, category_id: req.body.category}, {new: true});
        if(!updatedArticle) return res.status(404).send({error: 'Редактируемая новость не найдена'});
        return res.send({message: 'Новость успешно отредактированна'});
    } catch (e) {
        return res.status(400).send(e);
    }
});

router.delete('/:id', [authMiddleware, permit('admin')], async (req, res) => {
    try {
        const article = await Article.findOneAndRemove({
            _id: req.params.id
        });
        if(!article) return res.status(404).send({error: 'Новость не найдена.'});
        return res.send({message: `Новость "${article.title}" удалена`});
    } catch (e) {
        return res.status(500).send({error: 'Eternal Server Error'});
    }
});


module.exports = router;