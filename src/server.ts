import mongoose from "mongoose";
import "dotenv/config";

const connectDb = async () => {
  try {
    await mongoose.connect(
      `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.oiiyhkk.mongodb.net/testora`
    );
    console.log("MongoDb Connected");
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

export default connectDb;
