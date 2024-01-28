const productsRouter = require("../routes/products.route");
const categoriesRouter = require("../routes/categories.route");

const route = (app) => {
  app.use("/api/products", productsRouter);
  app.use("/api/categories", categoriesRouter);
  app.use("/", (req, res) => {
    res.send("Index page");
  });
};

module.exports = route;
