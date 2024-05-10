const joi = require('joi');

const productValid = (product)=> {
    const schema = joi.object ({
          proName: joi.string().min(3).max(30).required() ,
          proDescription: joi.string().min(3).required() ,
          proCategory: joi.string().min(2).required() ,
          proPrice: joi.string().min(1).required() ,
          proImg: joi.string().required() ,

    
    })
    return schema.validate(product)
};

const productValidUpdate = (product)=> {
    const schema = joi.object ({
          proName: joi.string().min(3).max(30),
          proDescription: joi.string().min(3) ,
          proCategory: joi.string().min(2) ,
          proPrice: joi.string().min(1),
          proImg: joi.string()
    })
    return schema.validate(product)
};

module.exports = {
    productValid,
    
productValidUpdate
}








// const Ajv = require("ajv");
// const productSchema = {
//   type: "object",

//   properties: {
//     proId: {
//       /*type: "object" */
//       type: "string",
//     },
//     proName: { type: "string", minLength: 3 },
//     proDescription: { type: "string", minLength: 5 },
//     proCategory: {
//       type: "string",

//       minLength: 2,
//       // enum: [],
//     },
//     proPrice: { type: "string", minLength: 1 },
//     proImg: { type: "string" },
  
//   },
//   required: [
//     "proId",
//     "proName",
//     "proDescription",
//     "proCategory",
//     "proPrice",
//     "proImg",
  
//   ],
//   maxProperties: 7,
//   minProperties: 7,
// };
// const ajv = new Ajv();
// const productValidationRouts = ajv.compile(productSchema);
// module.exports = productValidationRouts;
