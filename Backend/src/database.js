const mongoose = require("mongoose");
require("dotenv").config();

const uri = `mongodb+srv://${process.env.USER}:${process.env.PASSWORD}@cluster0.z70zv.mongodb.net/${process.env.DBNAME}?retryWrites=true&w=majority`;

mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((db) => console.log("conexion exitosa"))
  .catch((e) => console.log(e));

module.export = mongoose;
