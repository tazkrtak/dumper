const pkjs = require("../package.json");
const admin = require("firebase-admin");
const randomer = require("../util/randomer");
const hash = require("../util/hash");

const db = admin.firestore();

const StaffDumper = {
  async dump(options) {
    console.log("Dumping Staff Accounts...");

    var busesIds = [];
    await db
      .collection("buses")
      .get()
      .then(q => busesIds = q.docs.map(doc => doc.id))
      .catch(e => console.log(e));

    var count = options.count;
    var idLength = options.idLength;

    var batch = db.batch();

    for (let i = 0; i < count; i++) {
      var accountType = randomer.getRandomStaffAccountType();
      var id = randomer.getRandomStaffId(accountType, idLength);
      var docRef = db.collection("staff").doc(id);

      var account = {
        id,
        name: pkjs.name,
        password: hash.sha512("tazkrtak123"),
        ...(accountType == "CON" && { busId: busesIds.random() })
      };

      batch.set(docRef, account);
    }

    batch
      .commit()
      .then(console.log(`Finished dumping ${count} staff accounts.`))
      .catch(e => console.log(e));
  },

  async clear() {
    console.log("Clearing dumped staff accounts...");

    var batch = db.batch();

    await db
      .collection("staff")
      .where("name", "==", pkjs.name)
      .get()
      .then(querySnapshot =>
        querySnapshot.forEach(doc => batch.delete(doc.ref))
      )
      .catch(e => console.log(e));

    batch
      .commit()
      .then(console.log(`Finished clearing dumped staff accounts.`))
      .catch(e => console.log(e));
  }
};

module.exports = StaffDumper;
