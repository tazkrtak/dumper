// Initialize App
const admin = require("firebase-admin");
const key = require("./serviceAccountKey.json");
admin.initializeApp({
  credential: admin.credential.cert(key)
});

// Dumpers
const collectionsNames = [
  "users",
  "staff",
  "buses",
  "transactions",
  "feedbacks"
];

const UsersDumper = require("./dumpers/users");
const BusesDumper = require("./dumpers/buses");
const StaffDumper = require("./dumpers/staff");
const TransactionsDumper = require("./dumpers/transactions");
const FeedbacksDumper = require("./dumpers/feedbacks");

// Process args
const program = require("commander");

program
  .command("collections")
  .description("list available collections")
  .action(() => {
    collectionsNames.forEach(collection => {
      console.log(collection);
    });
  });

program
  .command("dump [collections...]")
  .description("dump documents to collection(s)")
  .action(async collections => {
    const collection = mapCollections(collections);
    if (collection.users) {
      UsersDumper.dump({
        count: program.count,
        idLength: program.userId,
        idPrefix: program.userIdPrefix
      });
    }
    if (collection.buses) {
      BusesDumper.dump({
        count: program.count
      });
    }
    if (collection.staff) {
      await StaffDumper.dump({
        count: program.count,
        idLength: program.staffId
      });
    }
    if (collection.transactions) {
      await TransactionsDumper.dump({
        count: program.count,
        amountRange: program.amount,
        allowNegative: program.negative,
        timestampStart: new Date(program.startYear, 0, 1),
        userNationalId: program.transactionUserId
      });
    }
    if (collection.feedbacks) {
      FeedbacksDumper.dump({
        count: program.count
      });
    }
  });

program
  .command("clear [collections...]")
  .description("clear dumped documents from collection(s)")
  .action(collections => {
    const collection = mapCollections(collections);
    if (collection.users) UsersDumper.clear();
    if (collection.buses) BusesDumper.clear();
    if (collection.staff) StaffDumper.clear();
    if (collection.transactions) TransactionsDumper.clear();
    if (collection.feedbacks) FeedbacksDumper.clear();
  });

program
  .option("-c, --count <number>", "number of documents to dump", parseInt, 10)
  .option("-s, --staff-id <number>", "length of staff account's id", parseInt, 6)
  .option("-u, --user-id <number>", "length of user's national id", parseInt, 14)
  .option("-p, --user-id-prefix <string>", "prefix for user's national id", "00")
  .option("-t, --transaction-user-id <string>", "user's national id used for transactions")
  .option("-a, --amount <number>", "transactions' amount bounds", parseInt, 100)
  .option("-n, --no-negative", "make zero a lower bound for transactions' amount")
  .option("-y, --start-year <number>", "transactions' start year", parseInt, 2018)
  .parse(process.argv);

function mapCollections(collections) {
  collections = [...collections];
  return collectionsNames.reduce((collection, name) => {
    collection[name] = collections.includes(name) || !collections.length;
    return collection;
  }, {});
}
