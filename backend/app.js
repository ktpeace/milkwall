/* TODO:
    Check: should be async/await?
    env variables for port and stuff?
    comments
*/
import express, { text } from "express";
import cors from "cors";
import fs from "fs";
const app = express();
app.use(cors());
app.use(express.json());
const port = 8080;
const data = fs.readFileSync("db.json");
const parsedData = JSON.parse(data);

app.get("/", (req, res) => {
  res.status(200);
  res.setHeader("Content-Type", "application/json");
  res.send(data);
});

app.post("/", (req, res) => {
  const newTextBlock = req.body["textBlock"];
  const newTime = Date.now();
  parsedData["textBlock"] = newTextBlock;
  if (newTime - parsedData["time"] >= 600000) {
    parsedData["time"] = newTime;
    fs.writeFile("db.json", JSON.stringify(parsedData), (err) => {
      if (err) throw err;
    });
    const textBlock = JSON.parse(data)["textBlock"];
    res.status(200);
    res.setHeader("Content-Type", "application/json");
    res.json(textBlock);
  } else {
    res.status(401);
    res.json("10 minutes have not passed since the last edit.");
  }
});

app.listen(port, "0.0.0.0", () => {
  console.log(`Example app listening on port ${port}`);
});
