const mongoose = require("mongoose");
const OrderStatus = {
  PENDING: 'pending',
  ACCEPTED: 'accepted',
  REJECTED: 'rejected'
};
const orderSchema = new mongoose.Schema(
  {
    proId: {
      /*type: Object*/ type: String,
      required: true,
    },
    proName: { type: String, trim: true, required: true, minlength: 3 },
    proDescription: { type: String, trim: true, required: true, minlength: 5 },
    proCategory: {
      type: String,
      trim: true,
      required: true,
      minlength: 2,
      // enum: [],
    },
    proPrice: { type: String, required: true, min: 1 },
    proImg: { type: String, trim: true, required: true },
    quantity: { type: String, trim: true, required: true },
    userEmail: { /*type: Object*/ type: String, required: true },
    orderStatus: { type: String, enum: Object.values(OrderStatus), default: OrderStatus.PENDING },
  },
  { timestamps: true }
);

const orderModel = mongoose.model("Order", orderSchema);
module.exports = orderModel;
