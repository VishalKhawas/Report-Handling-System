var studentdb = require("../model/model");

//create and save new user
exports.create = (req, res) => {
  if (!req.body) {
    res.status(400).send({ message: "Content cannot be Empty" });
    return;
  }

  //new user
  const student = new studentdb({
    name: req.body.name,
    email: req.body.email,
    uid: req.body.uid,
    branch: req.body.branch,
    section: req.body.section,
    password: req.body.password,
    name: req.body.name,
    name: req.body.name,
  });

  //save user in the db
  student
    .save(student)
    .then((data) => {
      //res.send(data);
      res.redirect("/add_user");
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "some error occured while creating the student",
      });
    });
};

//retrieve or return user
exports.find = (req, res) => {
  if (req.query.id) {
    const id = req.query.id;
    studentdb
      .findById(id)
      .then((data) => {
        if (!data) {
          res.status(404).send({ message: "Not found user with id: " + id });
        } else {
          res.send(data);
        }
      })
      .catch((err) => {
        res
          .status(500)
          .send({ message: "Error retrieving user with id: " + id });
      });
  } else {
    studentdb
      .find()
      .then((student) => {
        res.send(student);
      })
      .catch((err) => {
        res.status(500).send({
          message:
            err.message || "Error occured while retrieveing user information",
        });
      });
  }
};

//update an identified user
exports.update = (req, res) => {
  if (!req.body) {
    return res
      .status(500)
      .send({ message: "Data to be updated cannot be empty" });
  }

  const id = req.params.id;
  studentdb
    .findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res.status(404).send({ message: "Cannot update user" });
      } else {
        res.send(data);
      }
    })
    .catch((err) => {
      res.status(500).send({ message: "Error update user information" });
    });
};

//delete a user
exports.delete = (req, res) => {};
