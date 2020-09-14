var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var authenRouter = require("./routes/authen");

var app = express();
var cors = require('cors')
var app = express()

var mongoose = require("mongoose");
mongoose
  .connect(
    "mongodb+srv://thang:thang@cluster0-q8vge.mongodb.net/NAUSOC?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
    }
  )
  .then(() => console.log("DB Connected!"))
  .catch((err) => {
    console.log(Error, err.message);
  });


app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/authen", authenRouter);
app.use("/users", usersRouter);

module.exports = app;
