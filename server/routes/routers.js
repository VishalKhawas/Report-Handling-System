const express = require("express");
const route = express.Router();

const services = require("../services/render");
const controller = require("../controller/controller");

route.get("/", services.homeRoutes);

route.get("/login", services.login);

route.get("/login2", services.login2);

route.get("/adminindex", services.adminindex);

route.get("/add_user", services.add_user);

route.get("/update_user", services.update_user);

route.get("/contact", services.contact);

route.get("/about", services.about);

//API
route.post("/api/students", controller.create);
route.get("/api/students", controller.find);
route.put("/api/students/:id", controller.update);
route.delete("/api/students/:id", controller.delete);

module.exports = route;
