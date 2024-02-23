import config from "config";
import mongoose from "mongoose";
import winston from "winston";

export default function () {
  const db = config.get("db");
  mongoose.connect(db).then(() => console.log(`Connected to ${db}...`));
}
