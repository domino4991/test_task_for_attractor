const router = require('express').Router();
const multer = require('multer');
const path = require('path');
const {nanoid} = require('nanoid');
const config = require('../config');
const authMiddleware = require('../authMiddleware');

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
    try {
        const articles = await Article
            .find()
            .populate('category')
            .populate('user', 'username -_id')
            .limit(20);
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
            .populate('category')
            .populate('user', 'username -_id');
        if(!article) return res.status(404).send({error: 'Новость не найдена'});
        return res.send(article);
    } catch (e) {
        return res.status(500).send({error: 'Eternal Server Error'});
    }
});

router.post('/', authMiddleware, upload.single('image'), async (req, res) => {
    try {
        const article = new Article(req.body);
        if(req.file) {
            article.image = req.file.filename;
        }
        article.user = req.user._id;
        await article.save();
        return res.send({message: 'Новость создана'});
    } catch (e) {
        return res.status(400).send(e);
    }
});

router.put('/:id', authMiddleware, upload.single('image'), async (req, res) => {
    try {
        const updatedArticle = await Article.findOneAndUpdate({
            _id: req.params.id,
            user: req.user._id
        }, {...req.body}, {new: true});
        if(!updatedArticle) return res.status(404).send({error: 'Редактируемая новость не найдена'});
        return res.send({message: 'Новость успешно отредактированна'});
    } catch (e) {
        return res.status(400).send(e);
    }
});

router.delete('/:id', authMiddleware, async (req, res) => {
    try {
        const article = await Article.findOneAndRemove({
            _id: req.params.id,
            user: req.user._id
        });
        if(!article) return res.status(403).send({error: 'У вас нет прав для удаления этой новости'});
        return res.send({message: `Новость "${article.title}" удалена`});
    } catch (e) {
        return res.status(500).send({error: 'Eternal Server Error'});
    }
});


module.exports = router;