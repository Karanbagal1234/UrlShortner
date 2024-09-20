import mongoose from "mongoose";

export const connect = () => {
  mongoose
    .connect(process.env.NODE_ENV == "devlopment" ? process.env.DB_URI : "mongodb://localhost:27017/Shortner" , {
      dbName: "user",
    })
    .then(() => {
      console.log("database is connected");
    })
    .catch((err) => {
      console.log("database is not connected  bcuz" + err);
    });
};
