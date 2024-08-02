const express = require("express");
const app = express();
const dbConnection = require("./dbConnect/dbConnection");
const routes = require("./routes/routes.js");

app.use(express.json());


app.use("/", routes);
app.get("/", (req, res) => {
  res.send("backend works!");
}
);

app.listen(process.env.PORT, () => {
  console.log("Server is running on port 5000");
  dbConnection();
});