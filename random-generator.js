class RandomGenerator {
  static getRandomDate(start, end) {
    return new Date(
      start.getTime() + Math.random() * (end.getTime() - start.getTime())
    );
  }

  static getRandomNumber(range) {
    var num = Math.floor(Math.random() * range) + 1;
    num *= Math.floor(Math.random() * 2) == 1 ? 1 : -1;
    return num;
  }
}

module.exports = RandomGenerator;
