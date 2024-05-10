const mongoose = require ('mongoose');
const categorySchema = new mongoose.Schema({
    nameCAt: {
        type: String,
        required :true
    },
    img:{
        type: String,
        required :true
    
    }
})

const categoryModel = mongoose.model('Category',categorySchema);
module.exports = categoryModel;