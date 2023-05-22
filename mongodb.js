const mongodb = require("mongodb");

const connectionURL = "mongodb://127.0.0.1:27017/Pidev";
const databaseName = "task-manager";
const { MongoClient, ObjectID } = require("mongodb");
const id = ObjectID();
console.log(id.getTimestamp());

MongoClient.connect(
  connectionURL,
  { useNewUrlParser: true },
  (error, client) => {
    if (error) {
      return console.log("Unable to connect to database !");
    }

    const db = client.db(databaseName);

    db.collection("users")
      .deleteOne({
        name: "description",
      })
      .then((result) => {
        console.log(result);
      })
      .catch((error) => {
        console.log(error);
      });
    // client
  }
);
