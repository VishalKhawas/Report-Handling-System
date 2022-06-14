const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const path = require("path");
const services = require("./server/services/render");
const axios = require("axios");

const connectDB = require("./server/database/connection");
const async = require("hbs/lib/async");
const { registerAsyncHelper } = require("hbs");
const studentdb = require("./server/model/model");

const app = express();

dotenv.config({ path: "config.env" });
const PORT = process.env.PORT || 8080;

//log requests
app.use(morgan("tiny"));

//mongoDB connection
connectDB();

//parse request to body parser
app.use(bodyParser.urlencoded({ extended: true }));

//set view engine
app.set("view engine", "ejs");

//load assets
app.use("/css", express.static(path.resolve(__dirname, "assets/css")));
app.use("/img", express.static(path.resolve(__dirname, "assets/img")));
app.use("/js", express.static(path.resolve(__dirname, "assets/js")));

//load routers
app.use("/", require("./server/routes/routers"));

//login for student
app.post("/login", async (req, res) => {
  try {
    const uid = req.body.uid;
    const password = req.body.password;
    const studuid = await studentdb.findOne({ uid: uid });
    if (studuid.password === password) {
      axios
        .get("http://localhost:3000/api/students/")
        .then(function (response) {
          // const student2 = studentdb.findOne({ _id: studid });
          console.log(studuid);
          // res.send(student2);
          // console.log("nhi ho rha");
          res.render("studentindex", { studuid });
        })
        .catch((err) => {
          res.send(err);
        });
    } else {
      res.send("Invalid Credentials");
    }
  } catch (err) {
    res.status(400).send("Invalid nCredentials");
  }
});

app.post("/login2", async (req, res) => {
  try {
    const name = req.body.name;
    const password = req.body.password;
    const admin = await studentdb.findOne({ name: name });

    if (admin.password === password) {
      axios
        .get("http://localhost:3000/api/students")
        .then(function (response) {
          res.render("adminindex", { student: response.data });
        })
        .catch((err) => {
          res.send(err);
        });
    } else {
      res.send("Invalid Credentials");
    }
  } catch (err) {
    res.status(400).send("Invalid Credentials");
  }
});

app.listen(PORT, () => {
  console.log("Server is running on http://localhost:" + PORT);
});
