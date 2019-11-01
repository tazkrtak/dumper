Array.prototype.random = function() {
  return this[Math.floor(Math.random() * this.length)];
};

const Randomer = {
  getRandomDate(start, end = new Date()) {
    return new Date(
      start.getTime() + Math.random() * (end.getTime() - start.getTime())
    );
  },

  getRandomNumber(range, allowNegative = true) {
    var num = Math.floor(Math.random() * range) + 1;
    if (allowNegative) {
      num *= Math.floor(Math.random() * 2) == 1 ? 1 : -1;
    }
    return num;
  },

  getRandomSecret() {
    var num = this.getRandomNumber(9999, false);
    return "DUMPERSECRET" + String(num).padStart(4, "0");
  },

  getRandomNationalId(prefix, idLength = 14) {
    var nationalId = prefix || "";
    var length = (idLength - nationalId.length) / 2;
    for (let i = 0; i < length; i++) {
      var num = this.getRandomNumber(9, false);
      nationalId += num.toString() + num.toString();
    }
    return nationalId;
  },

  getRandomStaffAccountType() {
    return Math.floor(Math.random() * 2) == 1 ? "COL" : "CON";
  },

  getRandomStaffId(type, idLength = 4) {
    var id = "",
      i = 0,
      min = type == "CON" ? 10 : 0,
      max = type == "COL" ? 10 : 62;
    for (; i++ < idLength; ) {
      var r = (Math.random() * (max - min) + min) << 0;
      id += String.fromCharCode((r += r > 9 ? (r < 36 ? 55 : 61) : 48));
    }
    return id.toLocaleUpperCase();
  },

  getRandomPhoneNumber() {
    var phoneNumber = "013";
    for (let i = 0; i < 8; i++) {
      phoneNumber += this.getRandomNumber(9, false).toString();
    }
    return phoneNumber;
  }
};

module.exports = Randomer;
