const axios = require("axios");

exports.homeRoutes = (req, res) => {
  res.render("index");
};

exports.login = (req, res) => {
  res.render("login");
};

exports.login2 = (req, res) => {
  res.render("login2");
};

exports.about = (req, res) => {
  res.render("about");
};

exports.add_user = (req, res) => {
  res.render("add_user");
};

exports.update_user = (req, res) => {
  res.render("update_user");
};

exports.contact = (req, res) => {
  res.render("contact");
};

exports.update_user = (req, res) => {
  axios
    .get("http://localhost:3000/api/students", {
      params: { id: req.query.id },
    })
    .then(function (studentdata) {
      res.render("update_user", { student: studentdata.data });
    })
    .catch((err) => {
      res.send(err);
    });
};

exports.adminindex = (req, res) => {
  axios
    .get("http://localhost:3000/api/students")
    .then(function (response) {
      res.render("adminindex", { student: response.data });
    })
    .catch((err) => {
      res.send(err);
    });
};
