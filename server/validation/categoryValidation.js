const joi = require('joi');

const validateCategory = (category)=> {
    const schema = joi.object ({
        nameCAt: joi.string().min(3).max(30).required(),
        img:joi.string().required()
    })
    return schema.validate(category)
};

module.exports = {
    validateCategory
}
