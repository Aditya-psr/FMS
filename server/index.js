const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const EmployeeModel = require("./models/Employee");
const StopwatchDataModel = require("./models/StopwatchData");

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect(
  "mongodb+srv://Jingle:root@cluster0.cv0yjky.mongodb.net/Faculty",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

app.get('/getUsers', (req, res) => {
  EmployeeModel.find()
    .then((users) => res.json(users))
    .catch((err) => res.json(err));
});

app.post("/login", (req, res) => {
  const { userid, password } = req.body;
  EmployeeModel.findOne({ userid: userid }).then((user) => {
    if (user) {
      if (user.password === password) {
        res.json("Success");
      } else {
        res.json("Wrong password");
      }
    } else {
      res.json("User not found");
    }
  });
});

app.post("/users", (req, res) => {
  EmployeeModel.create(req.body)
    .then((employees) => res.json(employees))
    .catch((err) => res.json(err));
});

app.get("/stopwatch-data", (req, res) => {
  const userId = req.query.userId;

  StopwatchDataModel.find({ userId: userId })
    .then((data) => {
      console.log("Fetched stopwatch data:", data);
      const dates = data.map((record) => record.date);
      console.log("Stopwatch start dates found for userId", userId, ":", dates);
      res.json(dates);
    })
    .catch((err) => {
      console.error("Error fetching stopwatch start dates:", err);
      res.status(500).json("Error: " + err);
    });
});

app.post("/stopwatch-data", (req, res) => {
  const { userId, date } = req.body;

  const newStopwatchData = new StopwatchDataModel({
    userId: userId,
    date: date,
  });

  newStopwatchData
  .save()
  .then((data) => {
    console.log("Stopwatch start date saved:", data);
    res.json(data);
  })
  .catch((err) => {
    console.error("Error saving stopwatch start date:", err);
    res.status(400).json("Error: " + err);
  });
});


app.listen(3001, () => {
  console.log("server is running");
});