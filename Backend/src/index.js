const express = require("express");
let events = require("./input.json");
const app = express();
const morgan = require("morgan");
const path = require("path");
const { mongoose } = require("./database");
const cors = require("cors");
require("dotenv").config();

// Config/////
app.set("port", process.env.PORT || 5000);

//MiddleWere/////////////////////
app.use(morgan("dev"));
app.use(express.json());
const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions));

//////ROUTES/////////////////////////

app.use(require("./routes/routes"));

/////////////////////

let format = {
  server: null,
  date: null,
  severity: null,
  process: null,
  message: null,
};
let lenght = Object.keys(events).length;
let rawEvents1 = [];
for (let x = 0; x < lenght; x++) {
  format.server = events[x].server;
  format.date = new Date(events[x].date).toISOString();
  format.severity = events[x].severity;
  format.process = events[x].process;
  format.message = events[x].message;
  console.log(format);
  console.log("esyuo aca");
  events[x] = format;

  console.log("no se rompio");
}

//// STATIC FILES////////

app.use(express.static(path.join(__dirname, "public")));

////Starting Server//////////////////
app.listen(app.get("port"), () => {
  console.log(events);
  console.log(`server on port ${app.get("port")} `);
});
