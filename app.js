const express = require("express");
const fs = require("fs");
const catRoutes = require("./routes/cat");
const { UPLOADS_DIR } = require("./config");
const app = express();

if (!fs.existsSync(UPLOADS_DIR)) {
  fs.mkdirSync(UPLOADS_DIR);
}

app.use(express.json());
app.use("/upload", express.static(UPLOADS_DIR));

app.use("/v1/cats", catRoutes);

module.exports = app;
