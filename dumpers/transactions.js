const pkjs = require("../package.json");
const admin = require("firebase-admin");
const randomer = require("../util/randomer");

const db = admin.firestore();

const TransactionsDumper = {
  async dump(options) {
    console.log("Dumping transactions...");

    var usersIds = [];
    await db
      .collection("users")
      .get()
      .then(q => (usersIds = q.docs.map(doc => doc.id)))
      .catch(e => console.log(e));

    var count = options.count;
    var amountRange = options.amountRange;
    var allowNegative = options.allowNegative;
    var timestampStart = options.timestampStart;
    var timestampEnd = options.timestampEnd;
    var userNationalId = options.userNationalId;

    var batch = db.batch();

    for (let i = 0; i < count; i++) {
      var docRef = db.collection("transactions").doc();

      var transaction = {
        amount: randomer.getRandomNumber(amountRange, allowNegative),
        id: docRef.id,
        issuer: pkjs.name,
        timestamp: admin.firestore.Timestamp.fromDate(
          randomer.getRandomDate(timestampStart, timestampEnd)
        ),
        userNationalId: userNationalId || usersIds.random()
      };

      batch.set(docRef, transaction);
    }

    batch
      .commit()
      .then(console.log(`Finished dumping ${count} transactions.`))
      .catch(e => console.log(e));
  },

  async clear() {
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
};

module.exports = TransactionsDumper;
