const pkjs = require("../package.json");
const admin = require("firebase-admin");
const randomer = require("../util/randomer");

const db = admin.firestore();

const BusesDumper = {
  dump(options) {
    console.log("Dumping Buses...");

    var count = options.count;

    var batch = db.batch();

    for (let i = 0; i < count; i++) {
      var number = randomer.getRandomNumber(999, false);
      var id = number + ":" + db.collection("buses").doc().id;
      var docRef = db.collection("buses").doc(id);

      var bus = {
        endStation: pkjs.name,
        id,
        number,
        plateNumber: randomer.getRandomNumber(999, false),
        startStation: pkjs.name,
        ticketsPrices: [3, 5, 7]
      };

      batch.set(docRef, bus);
    }

    batch
      .commit()
      .then(console.log(`Finished dumping ${count} buses.`))
      .catch(e => console.log(e));
  },

  async clear() {
    console.log("Clearing dumped buses...");

    var batch = db.batch();

    await db
      .collection("buses")
      .where("startStation", "==", pkjs.name)
      .get()
      .then(querySnapshot =>
        querySnapshot.forEach(doc => batch.delete(doc.ref))
      )
      .catch(e => console.log(e));

    batch
      .commit()
      .then(console.log(`Finished clearing dumped buses.`))
      .catch(e => console.log(e));
  }
};

module.exports = BusesDumper;
