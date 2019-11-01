const Randomer = {
  getRandomDate(start, end) {
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

  getRandomPhoneNumber() {
    var phoneNumber = "013";
    for (let i = 0; i < 8; i++) {
      phoneNumber += this.getRandomNumber(9, false).toString();
    }
    return phoneNumber;
  }
};

module.exports = Randomer;
