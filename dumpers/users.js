const pkjs = require("../package.json");
const admin = require("firebase-admin");
const randomer = require("../util/randomer");
const hash = require("../util/hash");

const db = admin.firestore();

const UsersDumper = {
  dump(options) {

    console.log("Dumping Users...");

    var count = options.count;
    var idLength = options.idLength;
    var idPrefix = options.idPrefix;

    var batch = db.batch();

    for (let i = 0; i < count; i++) {
      var docRef = db.collection("users").doc(randomer.getRandomNationalId(idPrefix, idLength));

      var user = {
        balance: 0,
        chargedBalance: 0,
        email: `${docRef.id}@${pkjs.name}.test`,
        lastTransactionId: "",
        name: pkjs.name,
        nationalId: docRef.id,
        password: hash.sha512("tazkrtak123"),
        phoneNumber: randomer.getRandomPhoneNumber(),
        secret: randomer.getRandomSecret()
      };

      batch.set(docRef, user);
    }

    batch
      .commit()
      .then(console.log(`Finished dumping ${count} users.`))
      .catch(e => console.log(e));
  },

  async clear() {
    console.log("Clearing dumped users...");

    var batch = db.batch();

    await db
      .collection("users")
      .where("name", "==", pkjs.name)
      .get()
      .then(querySnapshot =>
        querySnapshot.forEach(doc => batch.delete(doc.ref))
      )
      .catch(e => console.log(e));

    batch
      .commit()
      .then(console.log(`Finished clearing dumped users.`))
      .catch(e => console.log(e));
  }
};

module.exports = UsersDumper;
