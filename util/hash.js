const crypto = require("crypto");

const Hash = {
  sha512(input) {
    const hash = crypto.createHash("sha512");
    data = hash.update(input, "utf-8");
    return data.digest("hex");
  }
};

module.exports = Hash;
