const router = require('express').Router();
const User = require('../models/User');
const authMiddleware = require('../middlewares/authMiddleware');
const permit = require('../middlewares/permit');

router.get('/', [authMiddleware, permit('admin')], async (req, res) => {
    try {
        const users = await User.find().select('username role');
        if(users.length === 0) return res.status(404).send({error: 'Нет зарегистрированных пользователей'});
        return res.send(users);
    } catch (e) {
        return res.status(500).send({error: 'Eternal Server Error'});
    }
});

router.get('/:id', [authMiddleware, permit('admin', 'user')], async (req, res) => {
    try {
        const user = await User.findById(req.params.id).select('username role');
        if(!user) return res.status(404).send({error: 'Пользователь не найден'});
        return res.send(user);
    } catch (e) {
        return res.status(500).send({error: 'Eternal Server Error'});
    }
});

router.post('/register', async (req, res) => {
    try {
        const user = new User({
            username: req.body.username,
            password: req.body.password
        });
        user.genToken();
        await user.save();
        return res.send({message: 'Регистрация прошла успешно'});
    } catch (e) {
        return res.status(400).send(e);
    }
});

router.post('/sessions', async (req, res) => {
    try {
        const user = await User.findOne({username: req.body.username});
        if(!user) return res.status(404).send({error: 'пользователь не найден'});
        const isMatch = await user.checkPass(req.body.password);
        if(!isMatch) return res.status(400).send({error: 'Неверный пароль'});
        user.genToken();
        await user.save({validateBeforeSave: false});
        return res.send({username: user.username, token: user.token, role: user.role});
    } catch (e) {
        return res.status(400).send(e);
    }
});

router.delete('/sessions', async (req, res) => {
    const token = req.get('Authorization');
    try {
        const success = {message: 'Success'};
        if (!token) return res.send(success);
        const user = await User.findOne({token});
        if (!user) return res.send(success);
        user.genToken();
        await user.save({validateBeforeSave: false});
        return res.send({message: 'Вы вышли из системы'});
    } catch (e) {
        return res.send(e);
    }
});

router.put('/:id', [authMiddleware, permit('admin', 'user')], async (req, res) => {
    let updatedUser;
    try {
        if(req.user._id.toString() === req.params.id.toString()) {
            updatedUser = await User
                .findOneAndUpdate(
                    {_id: req.user._id},
                    {username: req.body.username, password: req.body.password});
        } else if((req.params.id.toString() !== req.user._id.toString()) && (req.user.role === 'admin')) {
            updatedUser = await User
                .findOneAndUpdate(
                    {_id: req.params.id},
                    {role: req.body.role});
        }
        if(!updatedUser) return res.status(404).send({error: 'Пользователь не найден'});
        return res.send({message: 'Редактирование прошло успешно.'});
    } catch (e) {
        return res.status(400).send(e);
    }
});

router.delete('/:id', [authMiddleware, permit('admin')], async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if(req.user._id.toString() === user._id.toString()) {
            return res.status(500).send({error: 'Вы не можете удалить свой аккаунт'});
        }
        if(!user) return res.status(404).send({error: 'Пользователь не найден.'});
        await User.deleteOne({_id: req.params.id});
        return res.send({message: 'Пользователь удалён.'});
    } catch (e) {
        return res.status(400).send(e);
    }
});

module.exports = router;