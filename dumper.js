// Initialize App
const admin = require("firebase-admin");
const key = require("./serviceAccountKey.json");
admin.initializeApp({
  credential: admin.credential.cert(key)
});

// Dumpers
const UsersDumper = require("./dumpers/users");
const BusesDumper = require("./dumpers/buses");
const StaffDumper = require("./dumpers/staff");
const TransactionsDumper = require("./dumpers/transactions");
const FeedbacksDumper = require("./dumpers/feedbacks");

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
} else if (args.includes("staff")) {
  if (args.includes("dump")) {
    StaffDumper.dump({
      count: 5,
      idLength: 6
    });
  } else if (args.includes("clear")) {
    StaffDumper.clear();
  }
} else if (args.includes("buses")) {
  if (args.includes("dump")) {
    BusesDumper.dump({
      count: 5
    });
  } else if (args.includes("clear")) {
    BusesDumper.clear();
  }
} else if (args.includes("transactions")) {
  if (args.includes("dump")) {
    TransactionsDumper.dump({
      count: 5,
      amountRange: 100,
      allowNegative: true,
      timestampStart: new Date(2019, 0, 1)
      // userNationalId: "id_here"
    });
  } else if (args.includes("clear")) {
    TransactionsDumper.clear();
  }
}else if (args.includes("feedbacks")) {
  if (args.includes("dump")) {
    FeedbacksDumper.dump({
      count: 5
    });
  } else if (args.includes("clear")) {
    FeedbacksDumper.clear();
  }
} else {
  console.log("Usage :: node . collection-name [dump] [clear]");
}
