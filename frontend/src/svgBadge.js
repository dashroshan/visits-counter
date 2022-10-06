// Get an approximate width of the given string
const approxWidth = (str) => {
    let size = 0;
    for (let i = 0; i < str.length; i++) {
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

// Get the lightness percentage of any given color
function lightness(hex) {
    let result = /([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    let r = parseInt(result[1], 16) / 255;
    let g = parseInt(result[2], 16) / 255;
    let b = parseInt(result[3], 16) / 255;
    let max = Math.max(r, g, b), min = Math.min(r, g, b);
    let l = Math.round((max + min) * 50);
    return l;
}

// Generate the shadow color when black or white depending upon relative
// lightness of bg and text color is mixed in with the bgColor. This is used
// instead of opacity as multiple texts with the shadowColor are added a little
// below one another to create a solid long shadow
const shadowColor = (bgColor, textColor, opacity) => {
    let base = (lightness(bgColor) > lightness(textColor)) ? 0xFF : 0x00;
    let a = opacity/100;
    let r = Math.floor(base * a + Number(`0x${bgColor.substring(0, 2)}`) * (1 - a));
    let g = Math.floor(base * a + Number(`0x${bgColor.substring(2, 4)}`) * (1 - a));
    let b = Math.floor(base * a + Number(`0x${bgColor.substring(4, 6)}`) * (1 - a));
    const finalColor = "#" + ((r << 16) | (g << 8) | b).toString(16);
    return finalColor;
};

// Strip the # in the color code if present
const processColor = (color) => {
    if (color[0] === "#") return color.substring(1);
    else return color;
}

// Generate and return the SVG code for the badge
function svgBadge(label, shadow, opacity, swap, labelBGColor, countBGColor, labelTextColor, countTextColor, visits) {
    // Format the given parameter values
    labelBGColor = processColor(labelBGColor);
    countBGColor = processColor(countBGColor);
    labelTextColor = processColor(labelTextColor);
    countTextColor = processColor(countTextColor);
    shadow = (typeof shadow === "boolean") ? ((shadow) ? "1" : "0") : shadow;
    swap = (typeof swap === "boolean") ? ((swap) ? "1" : "0") : swap;
    if(typeof opacity === "string") opacity = parseInt(opacity,10);

    // Swap label and visits text if swap parameter is true
    if (swap === '1') [label, visits] = [visits, label];

    // Calculate the text widths
    let visitsWidth = 10 + (approxWidth(label.toString())) * 10;
    let countWidth = 10 + (approxWidth(visits.toString())) * 10;

    // Text shadow template
    let shadowTemplate = (shadow === "1") ? `
    <text transform="matrix(1 0 0 1 ${visitsWidth + 10.4} 14.8206)" fill="${shadowColor(countBGColor, countTextColor, opacity)}" font-family="Arial" font-size="10px">${visits}</text>
    <text transform="matrix(1 0 0 1 ${visitsWidth + 10.4} 14.1597)" fill="${shadowColor(countBGColor, countTextColor, opacity)}" font-family="Arial" font-size="10px">${visits}</text>
    <text transform="matrix(1 0 0 1 7.0189 14.8425)" fill="${shadowColor(labelBGColor, labelTextColor, opacity)}" font-family="Arial" font-size="10px">${label}</text>
    <text transform="matrix(1 0 0 1 7.038 14.1817)" fill="${shadowColor(labelBGColor, labelTextColor, opacity)}" font-family="Arial" font-size="10px">${label}</text>
    `: '';

    // Main SVG template
    let svg = `
    <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 ${visitsWidth + countWidth + 7.5} 20" xml:space="preserve">
    <g id="badge">
        <path fill="#${labelBGColor}" d="M46.11,20H4c-2.21,0-4-1.79-4-4V4c0-2.21,1.79-4,4-4h${visitsWidth}V20z"/>
        <path fill="#${countBGColor}" d="M46.11,20H${visitsWidth + countWidth + 3.5}c2.21,0,4-1.79,4-4V4c0-2.21-1.79-4-4-4H${visitsWidth + 4}V20z"/>
        ${shadowTemplate}
        <text transform="matrix(1 0 0 1 ${visitsWidth + 10.4} ${(shadow === "1") ? '13.4559' : '13.8'})" fill="#${countTextColor}" font-family="Arial" font-size="10px">${visits}</text>
        <text transform="matrix(1 0 0 1 7.038 ${(shadow === "1") ? '13.4559' : '13.8'})" fill="#${labelTextColor}" font-family="Arial" font-size="10px">${label}</text>
    </g>
    </svg>
    `;

    // Return the SVG template
    return svg;
}

module.exports = svgBadge;
