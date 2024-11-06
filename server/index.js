const express = require("express");
const path = require("path");
require("dotenv").config();

const app = express();
const pathToDistFolder = path.join(__dirname, "../giphy-search/dist");
const serverStatic = express.static(pathToDistFolder);

const logRoutes = (req, res, next) => {
  console.log(
    `${req.method}: ${req.originalUrl} - ${new Date().toLocaleString()}`
  );
  next();
};

let handleFetch;
(async () => {
  const module = await import("../giphy-search/src/utils.js");
  handleFetch = module.handleFetch;
})();

const serveGifs = async (req, res) => {
  const API_URL = `https://api.giphy.com/v1/gifs/trending?api_key=${process.env.API_KEY}&limit=25&rating=g`;
  const [data, error] = await handleFetch(API_URL);

  if (error) {
    console.log(error.message);
    return res.status(404).send({ error: error.message });
  }

  res.send(data.data);
};

app.use(serverStatic);
app.use(logRoutes);
app.get("/api/gifs", serveGifs);

const port = 8080;
app.listen(port, () => console.log(`Listening at http://localhost:${port}`));
