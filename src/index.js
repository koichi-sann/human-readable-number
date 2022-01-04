module.exports = function toReadable(number) {
    if (number === 0) return "zero";

    let string = number.toString();

    string = string.replace(/[, ]/g, "");

    units = [
        "",
        "one",
        "two",
        "three",
        "four",
        "five",
        "six",
        "seven",
        "eight",
        "nine",
        "ten",
        "eleven",
        "twelve",
        "thirteen",
        "fourteen",
        "fifteen",
        "sixteen",
        "seventeen",
        "eighteen",
        "nineteen",
    ];

    dozens = [
        "",
        "",
        "twenty",
        "thirty",
        "forty",
        "fifty",
        "sixty",
        "seventy",
        "eighty",
        "ninety",
    ];
    ten_powers = [
        "",
        "thousand",
        "million",
        "billion",
        "trillion",
        "quadrillion",
        "sextillion",
        "septillion",
        "octillion",
        "nonillion",
        "decillion",
        "undecillion",
        "duodecillion",
        "tredecillion",
        "quatttuor-decillion",
        "quindecillion",
        "sexdecillion",
        "septen-decillion",
        "octodecillion",
        "novemdecillion",
        "vigintillion",
        "centillion",
    ];

    let start = string.length;
    const chunks = [];
    while (start > 0) {
        let end = start;
        chunks.push(string.slice((start = Math.max(0, start - 3)), end));
    }

    const chunks_length = chunks.length;
    if (chunks_length > ten_powers.length) return "";

    let word;
    const words = [];
    for (let i = 0; i < chunks_length; ++i) {
        let chunk = parseInt(chunks[i]);

        if (chunk) {
            const integers = chunks[i].split("").reverse().map(parseFloat);

            if (integers[1] === 1) {
                integers[0] += 10;
            }

            if ((word = ten_powers[i])) {
                words.push(word);
            }

            if ((word = units[integers[0]])) {
                words.push(word);
            }

            if ((word = dozens[integers[1]])) {
                words.push(word);
            }
            if ((word = units[integers[2]])) {
                words.push(word + " hundred");
            }
        }
    }
    return words.reverse().join(" ");
};
