import mongoose from "mongoose";
import * as autoIncrement from "mongoose-auto-increment";

const {
  MONGO_HOST: hostname,
  MONGO_PORT: port,
  MONGO_DBNAME: dbName,
  MONGO_USERNAME: username,
  MONGO_PASSWORD: password,
} = process.env;

const uri = `mongodb://${username}:${password}@${hostname}:${port}/${dbName}`;

export const connection = mongoose.connect(uri, {
  useCreateIndex: true,
  useFindAndModify: false,
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

autoIncrement.initialize(mongoose.connection);
