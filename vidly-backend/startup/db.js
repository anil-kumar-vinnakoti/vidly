import config from "config";
import mongoose from "mongoose";
import winston from "winston";

export default function () {
  const db = config.get("db");
  mongoose
    .connect(
      "mongodb+srv://anil:Test1234@cluster1.zcf0yks.mongodb.net/node-tuts?retryWrites=true&w=majority"
    )
    .then(() => console.log(`Connected to ${db}...`));
}
