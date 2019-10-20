const pkjs = require("./package.json");
const admin = require("firebase-admin");
const RandomGenerator = require("./random-generator");

const db = admin.firestore();

class TransactionsDumper {
  static dump(options) {
    console.log("Dumping transactions...");

    var count = options.count;
    var amountRange = options.amountRange;
    var timestampStart = options.timestampStart;
    var timestampEnd = options.timestampEnd;
    var userNationalId = options.userNationalId;

    var batch = db.batch();

    for (let i = 0; i < count; i++) {
      var docRef = db.collection("transactions").doc();

      var transaction = {
        amount: RandomGenerator.getRandomNumber(amountRange),
        id: docRef.id,
        issuer: pkjs.name,
        timestamp: admin.firestore.Timestamp.fromDate(
          RandomGenerator.getRandomDate(timestampStart, timestampEnd)
        ),
        userNationalId: userNationalId || "NONE_EXISTING_USER"
      };

      batch.set(docRef, transaction);
    }

    batch
      .commit()
      .then(console.log(`Finished dumping ${count} transactions.`))
      .catch(e => console.log(e));
  }

  static async clear() {
    console.log("Clearing dumped transactions...");

    var batch = db.batch();

    await db
      .collection("transactions")
      .where("issuer", "==", pkjs.name)
      .get()
      .then(querySnapshot =>
        querySnapshot.forEach(doc => batch.delete(doc.ref))
      )
      .catch(e => console.log(e));

    batch
      .commit()
      .then(console.log(`Finished clearing dumped transactions.`))
      .catch(e => console.log(e));
  }
}

module.exports = TransactionsDumper;
