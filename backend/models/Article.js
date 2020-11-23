const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ArticleSchema = new Schema({
    category_id: {
        type: Schema.Types.ObjectId,
        ref: 'Category',
        required: true
    },
    user_id: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        immutable: true
    },
    title: {
        type: String,
        required: [true, 'Поле "Заголовок" не должно быть пустым']
    },
    description: {
        type: String,
        required: [true, 'Поле "Описание" не должно быть пустым']
    },
    image: {
        type: String,
        required: [true, 'Поле "Изображение" не должно быть пустым']
    }
}, {
    versionKey: false
});

const Article = mongoose.model('Article', ArticleSchema);

module.exports = Article;