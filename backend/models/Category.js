const mongoose = require('mongoose');
const Article = require('./Article');

const Schema = mongoose.Schema;

const CategorySchema = new Schema({
    title: {
        type: String,
        required: [true, 'Поле "Наименование категории" не должно быть пустым']
    }
}, {
    versionKey: false
});

CategorySchema.pre('findOneAndRemove', async function (next) {
    const id = this._conditions._id;
    try {
        const articles = await Article.find({category_id: id});
        if(!articles || articles.length === 0) return next();
        await Article.deleteMany({category_id: id});
        next();
    } catch (e) {
        next();
    }
})

const Category = mongoose.model('Category', CategorySchema);

module.exports = Category;