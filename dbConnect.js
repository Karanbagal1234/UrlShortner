import mongoose from "mongoose";

export const connect = () => {
  mongoose
    .connect("mongodb+srv://karanbagal01234:karanbagal01234@karanbagal.genn3.mongodb.net/", {
      dbName: "user",
    })
    .then(() => {
      console.log("database is connected");
    })
    .catch((err) => {
      console.log("database is not connected  bcuz" + err);
    });
};
