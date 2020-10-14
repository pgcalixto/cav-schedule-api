import mongoose from "mongoose";
import * as autoIncrement from "mongoose-auto-increment";

const {
  MONGO_HOST: hostname,
  MONGO_PORT: port,
  MONGO_DBNAME: dbName,
  MONGO_USERNAME: username,
  MONGO_PASSWORD: password,
} = process.env;

const uri =
  process.env.NODE_ENV === "test"
    ? `mongodb://${hostname}:${port}/${dbName}`
    : `mongodb://${username}:${password}@${hostname}:${port}/${dbName}`;

export const connection = mongoose.connect(uri, {
  useCreateIndex: true,
  useFindAndModify: false,
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

export async function disconnect(): Promise<void> {
  if (mongoose.connection.readyState !== 0) {
    return mongoose.disconnect();
  }
}

autoIncrement.initialize(mongoose.connection);
