import express, { Application } from "express";
const app: Application = express();
import cors from "cors";

// parsers
app.use(express.json());
app.use(cors());

// testing route
app.get('/', (req, res) => {
  res.send('Hello World! Introducing Camping Corner!')
})


export default app;