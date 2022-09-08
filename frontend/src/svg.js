const approxWidth = (str) => {
    let size = 0;
    for (var i = 0; i < str.length; i++) {
        let s = str[i];
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
};

const shadowColor = (bgColor) => {
    var a = 0.3;
    var r = Math.floor(0x00 * a + Number(`0x${bgColor.substring(0, 2)}`) * (1 - a));
    var g = Math.floor(0x00 * a + Number(`0x${bgColor.substring(2, 4)}`) * (1 - a));
    var b = Math.floor(0x00 * a + Number(`0x${bgColor.substring(4, 6)}`) * (1 - a));
    const finalColor = "#" + ((r << 16) | (g << 8) | b).toString(16);
    return finalColor;
};

function svg(textContentI, textShadowI, visitsBGI, countBGI, visitsTextI, countTextI) {
    // Getting values from query
    const visitsBG = visitsBGI.substring(1);
    const countBG = countBGI.substring(1);
    const visitsText = visitsTextI.substring(1);
    const countText = countTextI.substring(1);
    const textShadow = (textShadowI) ? "1" : "0";
    const visitsValue = textContentI;
    let visits = 12345;

    // Calculating text widths
    let visitsWidth = 10 + (approxWidth(visitsValue)) * 10;
    let countWidth = 10 + (approxWidth(visits.toString())) * 10;

    // Text shadow template
    let shadow = (textShadow === "1") ? `
    <text transform="matrix(1 0 0 1 ${visitsWidth + 10.4} 14.8206)" fill="${shadowColor(countBG)}" font-family="Arial" font-size="10px">${visits}</text>
    <text transform="matrix(1 0 0 1 ${visitsWidth + 10.4} 14.1597)" fill="${shadowColor(countBG)}" font-family="Arial" font-size="10px">${visits}</text>
    <text transform="matrix(1 0 0 1 7.0189 14.8425)" fill="${shadowColor(visitsBG)}" font-family="Arial" font-size="10px">${visitsValue}</text>
    <text transform="matrix(1 0 0 1 7.038 14.1817)" fill="${shadowColor(visitsBG)}" font-family="Arial" font-size="10px">${visitsValue}</text>
    `: '';

    // Main svg template
    let svg = `
    <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 ${visitsWidth + countWidth + 7.5} 20" xml:space="preserve">
    <g id="badge">
        <path fill="#${visitsBG}" d="M46.11,20H4c-2.21,0-4-1.79-4-4V4c0-2.21,1.79-4,4-4h${visitsWidth}V20z"/>
        <path fill="#${countBG}" d="M46.11,20H${visitsWidth + countWidth + 3.5}c2.21,0,4-1.79,4-4V4c0-2.21-1.79-4-4-4H${visitsWidth + 4}V20z"/>
        ${shadow}
        <text transform="matrix(1 0 0 1 ${visitsWidth + 10.4} ${(textShadow === "1") ? '13.4559' : '13.8'})" fill="#${countText}" font-family="Arial" font-size="10px">${visits}</text>
        <text transform="matrix(1 0 0 1 7.038 ${(textShadow === "1") ? '13.4559' : '13.8'})" fill="#${visitsText}" font-family="Arial" font-size="10px">${visitsValue}</text>
    </g>
    </svg>
    `;

    return svg;
}

export default svg;