// Initialize App
const admin = require("firebase-admin");
const key = require("./serviceAccountKey.json");
admin.initializeApp({
  credential: admin.credential.cert(key)
});

// Dumpers
const TransactionsDumper = require("./transactions-dumper");

// Process args
var args = process.argv.slice(2);

if (args.includes("dump") && !args.includes("clear")) {
  TransactionsDumper.dump({
    count: 5,
    amountRange: 100,
    timestampStart: new Date(2019, 0, 1),
    timestampEnd: new Date()
    // userNationalId: "id_here"
  });
} else if (args.includes("clear") && !args.includes("dump")) {
  TransactionsDumper.clear();
} else {
  console.log("Usage :: node . [dump] [clear]");
}
