import mongoose from "mongoose";

export default function () {
  const db = process.env.DB_URI;
  mongoose.connect(db).then(() => console.log(`Connected to ${db}...`));
}
