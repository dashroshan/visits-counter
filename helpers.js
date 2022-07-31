// Generate a solid shadow color from the background color
const shadowColor = (bgColor) => {
    var a = 0.3;
    var r = Math.floor(0x00 * a + Number(`0x${bgColor.substring(0, 2)}`) * (1 - a));
    var g = Math.floor(0x00 * a + Number(`0x${bgColor.substring(2, 4)}`) * (1 - a));
    var b = Math.floor(0x00 * a + Number(`0x${bgColor.substring(4, 6)}`) * (1 - a));
    const finalColor = "#" + ((r << 16) | (g << 8) | b).toString(16);
    return finalColor;
};

// Generate an approximate width for the text
const approxWidth = (str) => {
    let size = 0;
    for (var i = 0; i < str.length; i++) {
        s = str[i];
        if ('lij|\' '.includes(s)) size += 37;
        else if ('![]fI.,:;/\\t'.includes(s)) size += 50;
        else if ('`-(){}r"'.includes(s)) size += 60;
        else if ('*^zcsJkvxy'.includes(s)) size += 85;
        else if ('aebdhnopqug#$L+<>=?_~FZT0123456789'.includes(s)) size += 95;
        else if ('BSPEAKVXY&UwNRCHD'.includes(s)) size += 112;
        else if ('QGOMm%W@'.includes(s)) size += 135;
        else size += 50;
    }
    return size * 6 / 1000.0;
}

module.exports.approxWidth = approxWidth;
module.exports.shadowColor = shadowColor;