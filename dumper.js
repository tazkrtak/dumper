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
const program = require("commander");
const collectionsNames = [
  "users",
  "staff",
  "buses",
  "transactions",
  "feedbacks"
];

program
  .command("collections")
  .description("list available collections")
  .action(() => {
    collectionsNames.forEach(collection => {
      console.log(collection);
    });
  });

program
  .command("dump <collections...>")
  .description("dump documents to collection(s)")
  .action(collections => {
    const collection = mapCollections(collections);
    if (collection.users) {
      UsersDumper.dump({
        count: 5,
        idLength: 14,
        idPrefix: "00"
      });
    }
    if (collection.staff) {
      StaffDumper.dump({
        count: 5,
        idLength: 6
      });
    }
    if (collection.transactions) {
      TransactionsDumper.dump({
        count: 5,
        amountRange: 100,
        allowNegative: true,
        timestampStart: new Date(2019, 0, 1)
        // userNationalId: "id_here"
      });
    }
    if (collection.buses) {
      BusesDumper.dump({
        count: 5
      });
    }
    if (collection.feedbacks) {
      FeedbacksDumper.dump({
        count: 5
      });
    }
  });

program
  .command("clear <collections...>")
  .description("clear dumped documents from collection(s)")
  .action(collections => {
    const collection = mapCollections(collections);
    if (collection.users) UsersDumper.clear();
    if (collection.staff) StaffDumper.clear();
    if (collection.transactions) TransactionsDumper.clear();
    if (collection.buses) BusesDumper.clear();
    if (collection.feedbacks) FeedbacksDumper.clear();
  });

program.parse(process.argv);

function mapCollections(collections) {
  collections = [...collections];
  return collectionsNames.reduce((collection, name) => {
    collection[name] = collections.includes(name);
    return collection;
  }, {});
}
