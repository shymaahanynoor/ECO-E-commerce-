const router = require("express").Router();

const paymentController = require("../controllers/payment.controller");

router.post("/", paymentController.createPayment);

module.exports = router;
