// Initialize App
const admin = require("firebase-admin");
const key = require("./serviceAccountKey.json");
admin.initializeApp({
  credential: admin.credential.cert(key)
});

// Dumpers
const TransactionsDumper = require("./dumpers/transactions");
const UsersDumper = require("./dumpers/users");

// Process args
var args = process.argv.slice(2);

if (args.includes("users")) {
  if (args.includes("dump")) {
    UsersDumper.dump({
      count: 5,
      idLength: 14,
      idPrefix: "00"
    });
  } else if (args.includes("clear")) {
    UsersDumper.clear();
  }
} else if (args.includes("transactions")) {
  if (args.includes("dump")) {
    TransactionsDumper.dump({
      count: 5,
      amountRange: 100,
      timestampStart: new Date(2019, 0, 1),
      timestampEnd: new Date()
      // userNationalId: "id_here"
    });
  } else if (args.includes("clear")) {
    TransactionsDumper.clear();
  }
} else {
  console.log("Usage :: node . collection [dump] [clear]");
}
