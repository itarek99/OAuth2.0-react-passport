import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";

dotenv.config();
const app = express();
app.use(express.json());
app.use(cors({ origin: "http://localhost:5173", credentials: true }));

// app.use(
//   session({
//     secret: "asdfasdf",
//     resave: false,
//     saveUninitialized: true,
//     cookie: {
//       httpOnly: true,
//       secure: process.env.NODE_ENV === "production",
//     },
//   })
// );

mongoose
  .connect(process.env.LOCAL_MONGO_URL || "")
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log(err);
  });

app.get("/", (req, res) => {
  res.cookie("test", "test", { httpOnly: true, secure: process.env.NODE_ENV === "production" });
  res.json({ message: "Hello World" });
});

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
