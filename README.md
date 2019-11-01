# dumper

A script to dump Firestore documents for testing.

## Usage

```text
Usage: dumper [options] [command]

Options:
  -c, --count <number>                number of documents to dump (default: 10)
  -s, --staff-id <number>             length of staff account's id (default: 6)
  -u, --user-id <number>              length of user's national id (default: 14)
  -p, --user-id-prefix <string>       prefix for user's national id (default: "00")
  -t, --transaction-user-id <string>  user's national id used for transactions
  -a, --amount <number>               transactions' amount bounds (default: 100)
  -n, --no-negative                   make zero a lower bound for transactions' amount
  -y, --start-year <number>           transactions' start year (default: 2018)
  -h, --help                          output usage information

Commands:
  collections                         list available collections
  dump [collections...]               dump documents to collection(s)
  clear [collections...]              clear dumped documents from collection(s)
```
