import mongoose from "mongoose";

export const DB_CONNECT = async () => {
  try {
    const dbInstance = await mongoose.connect(
      `${process.env.MONGO_URL}`
    );
    console.log(dbInstance.connection.host, dbInstance.connection.port);
  } catch (error) {
    console.log("Database Error:: ", error);
    throw error;
  }
};
