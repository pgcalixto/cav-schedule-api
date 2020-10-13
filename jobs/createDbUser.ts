if (!process.env.POPULATE_DB) {
  process.exit(0);
}

import { MongoClient } from "mongodb";

const {
  MONGO_HOST: hostname,
  MONGO_PORT: port,
  MONGO_DBNAME: dbName,
  MONGO_USERNAME: username,
  MONGO_PASSWORD: password,
} = process.env;

const uri = `mongodb://${hostname}:${port}/${dbName}`;

const client = new MongoClient(uri, { useUnifiedTopology: true });

async function createUser(): Promise<void> {
  console.log("Database user creation started.");

  await client.connect();

  const database = client.db(dbName);

  const { users } = await database.command({
    usersInfo: { user: username, db: dbName },
    showPrivileges: true,
  });

  if (users.length > 0) {
    await database.removeUser(username as string);
  }

  await database.addUser(username as string, password as string, {
    roles: [{ role: "readWrite", db: dbName }],
  });

  console.log("Database user creation finished.");

  return client.close();
}

createUser();
