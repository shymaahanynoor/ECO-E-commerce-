const express = require("express");
const cartController = require("../controllers/cartControllerDB");
const cartRouter = express.Router();
app = express();

// cartRouter.get("/api/v1/cart", cartController.getUserCart);
// cartRouter.post("/api/v1/cart/add", cartController.addNewProToUserCart);
// cartRouter.put("/api/v1/cart/:proId", cartController.updateProInUserCart);
// cartRouter.delete("/api/v1/cart/:proId", cartController.deleteOneProductFromUserCart);
// cartRouter.delete("/api/v1/cart/clear", cartController.deleteAllUserCart);

// cartRouter.get("/add", cartController.addNewProToUserCart);
cartRouter.post("/add", cartController.addNewProToUserCart);
cartRouter.put("/upd/:id", cartController.updateProInUserCart);
cartRouter.delete("/clear", cartController.deleteAllUserCart);
cartRouter.get("/del/:myObj", cartController.deleteOneProductFromUserCart);
cartRouter.delete("/del/:id", cartController.deleteOneProductFromUserCart);
cartRouter.get("/:email", cartController.getUserCart);

module.exports = cartRouter;
