import pkg from "mongodb";
const { MongoClient } = pkg;
const url = "mongodb://localhost:27017";
let args = { useUnifiedTopology: true };

// connect to mongo
let mongo = new MongoClient(url);
let db = mongo.db("myproject");
const collection = db.collection("users");
const users = collection;

console.log("successfully connected to db");

// create user account using the .insertOne function
async function create(name, email, password) {
  console.log("creating user...");

  const doc = { name, email, password, balance: 0 };

  let results = await users.insertOne(doc);
  console.log("done insertion");
  console.log(results);
  return doc;

  // return new Promise((resolve, reject) => {
  //   collection.insertOne(doc, { writeConcern: 1 }, (err, result) => {
  //     err ? reject(err) : resolve(doc);
  //   });
  // });
}

// find user account
async function find(email) {
  let customers = await db.collection("users").find({ email });

  let results = [];
  for await (const entry of customers) {
    console.log(entry);
    results.push(entry);
  }

  return results;

  // return new Promise((resolve, reject) => {
  //   const customers = db
  //     .collection("users")
  //     .find({ email: email })
  //     .toArray(function (err, docs) {
  //       err ? reject(err) : resolve(docs);
  //     });
  // });
}

// find user account
function findOne(email) {
  return new Promise((resolve, reject) => {
    const customers = db
      .collection("users")
      .findOne({ email: email })
      .then((doc) => resolve(doc))
      .catch((err) => reject(err));
  });
}

// update - deposit/withdraw amount
function update(email, amount) {
  return new Promise((resolve, reject) => {
    const customers = db
      .collection("users")
      .findOneAndUpdate(
        { email: email },
        { $inc: { balance: amount } },
        { returnOriginal: false },
        function (err, documents) {
          err ? reject(err) : resolve(documents);
        }
      );
  });
}

// return all users
async function all() {
  let customers = users.find();

  let results = [];
  for await (const entry of customers) {
    console.log(entry);
    results.push(entry);
  }

  return results;

  // return new Promise((resolve, reject) => {
  //   const customers = db
  //     .collection("users")
  //     .find({})
  //     .toArray(function (err, docs) {
  //       err ? reject(err) : resolve(docs);
  //     });
  // });
}

export { create, findOne, find, update, all };
