const mongoose = require("mongoose");
const user = "jack";
const password = "1234";
const dbName = "api_db";
const uri = `mongodb+srv://jack:${password}@cluster0.z70zv.mongodb.net/${dbName}?retryWrites=true&w=majority`;

mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((db) => console.log("conexion exitosa"))
  .catch((e) => console.log(e));

module.export = mongoose;
