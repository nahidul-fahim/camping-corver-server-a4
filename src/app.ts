import express, { Application } from "express";
const app: Application = express();
import cors from "cors";
import globalErrorHandler from "./app/middlewares/globalErrorHandler";
import notFound from "./app/middlewares/notFound";
import router from "./app/routes";

// parsers
app.use(express.json());
const allowedOrigins = ['http://localhost:5173', 'https://camping-corner.vercel.app'];
app.use(cors({
  origin: allowedOrigins,
  credentials: true
}));


// application routes
app.use("/api/v1", router)


// testing route
app.get('/', (req, res) => {
  res.send('Hello World! Introducing Camping Corner!')
})


// global error handler
app.use(globalErrorHandler)

// not found handler
app.use(notFound)


export default app;