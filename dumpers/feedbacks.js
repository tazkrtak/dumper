const pkjs = require("../package.json");
const admin = require("firebase-admin");
const randomer = require("../util/randomer");

const db = admin.firestore();

const FeedbacksDumper = {
  dump(options) {
    console.log("Dumping Feedbacks...");

    var count = options.count;

    var batch = db.batch();

    for (let i = 0; i < count; i++) {
      var docRef = db.collection("feedbacks").doc();

      var feedback = {
        id: docRef.id,
        timestamp: admin.firestore.Timestamp.fromDate(new Date()),
        rating: randomer.getRandomNumber(5, false),
        message: pkjs.name,
        userNationalId: "NONE_EXISTING_USER"
      };

      batch.set(docRef, feedback);
    }

    batch
      .commit()
      .then(console.log(`Finished dumping ${count} feedbacks.`))
      .catch(e => console.log(e));
  },

  async clear() {
    console.log("Clearing dumped feedbacks...");

    var batch = db.batch();

    await db
      .collection("feedbacks")
      .where("message", "==", pkjs.name)
      .get()
      .then(querySnapshot =>
        querySnapshot.forEach(doc => batch.delete(doc.ref))
      )
      .catch(e => console.log(e));

    batch
      .commit()
      .then(console.log(`Finished clearing dumped feedbacks.`))
      .catch(e => console.log(e));
  }
};

module.exports = FeedbacksDumper;
