import mongoose from "mongoose";

export const connect = () => {
  mongoose
    .connect(process.env.DB_URI, {
      dbName: "user",
    })
    .then(() => {
      console.log("database is connected");
    })
    .catch((err) => {
      console.log("database is not connected  bcuz" + err);
    });
};
