const express = require("express");
const app = express();
const morgan = require("morgan");
const path = require("path");
const { mongoose } = require("./database");
const cors = require("cors");

// Config/////
app.set("port", process.env.port || 5000);

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

//// STATIC FILES////////

app.use(express.static(path.join(__dirname, "public")));

////Starting Server//////////////////
app.listen(app.get("port"), () => {
  console.log(`server on port ${app.get("port")} `);
});
