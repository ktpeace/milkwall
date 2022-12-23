import express from "express";
import cors from "cors";
import fs from "fs";
const app = express();
app.use(cors());
app.use(express.json());
const PORT = 8080;
const DB_FILE = "db.json";
// if you change time limit below, also change messages in frontend
const TIME_LIMIT = 60000 * 1;
const TIME_LIMIT_MESSAGE = "1 minute has not passed since the last edit.";

app.get("/", (req, res) => {
  const data = fs.readFileSync(DB_FILE);
  res.status(200);
  res.setHeader("Content-Type", "application/json");
  res.send(data);
});

// create new JSON object with req text & current time
// allow edit if time limit has passed
app.post("/", (req, res) => {
  const data = fs.readFileSync(DB_FILE);
  const newTextBlock = req.body["textBlock"];
  const newTime = Date.now();
  const parsedData = JSON.parse(data);
  parsedData["textBlock"] = newTextBlock;
  if (newTime - parsedData["time"] >= TIME_LIMIT) {
    parsedData["time"] = newTime;
    fs.writeFile(DB_FILE, JSON.stringify(parsedData), (err) => {
      if (err) throw err;
    });
    const textBlock = JSON.parse(data)["textBlock"];
    res.status(200);
    res.setHeader("Content-Type", "application/json");
    res.json(textBlock);
  } else {
    res.status(401);
    res.json(TIME_LIMIT_MESSAGE);
  }
});

// temporary solution for checking if enough time has passed for edits
// without changing timestamp
app.put("/", (req, res) => {
  const data = fs.readFileSync(DB_FILE);
  const newTime = Date.now();
  const parsedData = JSON.parse(data);
  if (newTime - parsedData["time"] >= TIME_LIMIT) {
    res.status(200);
    res.json();
  } else {
    res.status(401);
    res.json(TIME_LIMIT_MESSAGE);
  }
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`App listening on port ${PORT}`);
});
