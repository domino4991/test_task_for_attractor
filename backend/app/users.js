const router = require('express').Router();
const User = require('../models/User');
const authMiddleware = require('../authMiddleware');

router.post('/', async (req, res) => {
    try {
        const user = new User(req.body);
        user.genToken();
        await user.save();
        return res.send({message: 'Регистрация прошла успешно'});
    } catch (e) {
        return res.status(500).send({error: 'Eternal Server Error'});
    }
});

router.post('/sessions', async (req, res) => {
    if(req.body.username.length === 0) return res.status(400).send({error: 'Логин должен быть заполнен'});
    if(req.body.password.length === 0) return res.status(400).send({error: 'Пароль должен быть заполнен'});
    try {
        const user = await User.findOne({username: req.body.username});
        if(!user) return res.status(404).send({error: 'пользователь не найден'});
        const isMatch = await user.checkPass(req.body.password);
        if(!isMatch) return res.status(400).send({error: 'Неверный пароль'});
        user.genToken();
        await user.save({validateBeforeSave: false});
        return res.send({username: user.username, token: user.token});
    } catch (e) {
        return res.status(400).send({error: 'Bad request'});
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

router.put('/', authMiddleware, async (req, res) => {
    try {
        const updatedUser = await User.findOneAndUpdate({_id: req.user._id}, {...req.body}, {new: true});
        if(!updatedUser) return res.status(403).send({error: 'У вас нет прав на редактирование этого пользователя'});
        return res.send({message: 'Редактирование прошло успешно.'});
    } catch (e) {
        return res.status(400).send(e);
    }
});

router.delete('/:username', authMiddleware, async (req, res) => {
    try {
        const user = await User.findOneAndRemove({
            _id: req.user._id,
            username: req.params.username
        });
        if(!user) return res.status(403).send({error: 'У вас нет прав на удаление этого пользователя'});
        return res.send({message: 'Пользователь удалён.'});
    } catch (e) {
        return res.status(400).send(e);
    }
});

module.exports = router;