import { MongoClient } from "https://deno.land/x/mongo@v0.31.1/mod.ts";

const client = new MongoClient();
await client.connect({
  db: "organiza",
  tls: true,
  servers: [
    { host: "organiza-shard-00-01.xen4l.mongodb.net", port: 27017 },
  ],
  credential: {
    username: "admin1",
    password: "admin1",
    db: "admin",
    mechanism: "SCRAM-SHA-1",
  },
});

export const db = client.database("realstate");
