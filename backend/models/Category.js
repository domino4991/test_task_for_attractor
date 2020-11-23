const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const CategorySchema = new Schema({
    title: {
        type: String,
        required: [true, 'Поле "Наименование категории" не должно быть пустым']
    }
}, {
    versionKey: false
});

const Category = mongoose.model('Category', CategorySchema);

module.exports = Category;