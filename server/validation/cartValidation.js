const Ajv = require("ajv");
const cartSchema = {
  type: "object",

  properties: {
    proId: {
      /*type: "object" */
      type: "string",
    },
    proName: { type: "string", minLength: 3 },
    proDescription: { type: "string", minLength: 5 },
    proCategory: {
      type: "string",
      minLength: 2,
      // enum: [],
    },
    proPrice: { type: "string", minLength: 1 },
    proImg: { type: "string" },
    userEmail: { /*type: "object" */ type: "string" },
    quantity: { /*type: "object" */ type: "string" },
  },
  required: [
    "proId",
    "proName",
    "proDescription",
    "proCategory",
    "proPrice",
    "proImg",
    "userEmail",
  ],
  maxProperties: 8,
  minProperties: 7,
};
const ajv = new Ajv();
const cartValidationRouts = ajv.compile(cartSchema);
module.exports = cartValidationRouts;
