const productsRouter = require("../routes/products.route");
const categoriesRouter = require("../routes/categories.route");
const productsDescriptionRouter = require("../routes/productsDescription.route");

const route = (app) => {
  app.use("/api/products", productsRouter);
  app.use("/api/categories", categoriesRouter);
  app.use("/api/productsDescription", productsDescriptionRouter);
  app.use("/", (req, res) => {
    res.send("Index page");
  });
};

module.exports = route;
