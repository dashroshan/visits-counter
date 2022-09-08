# Visits Counter

URL query based fully customizable SVG visits counter badge for github markdown files and sites.

## Demo

**Note -** Don't use these demo links directly for your own visits counter badge. Refer [how to use](#how-to-use) section.

<img src = "https://visits.roshan.cyou/Cdq5ki5Oij5PYNgE" height = 30px/>

```html
<img src = "https://visits.roshan.cyou/Cdq5ki5Oij5PYNgE" height = 30px/>
```

<img src = "https://visits.roshan.cyou/Cdq5ki5Oij5PYNgE?textContent=Profile+Views&textShadow=0&visitsBG=242424&countBG=a8a8a8&visitsText=ffffff&countText=000000" height = 30px/>

```html
<img src = "https://visits.roshan.cyou/Cdq5ki5Oij5PYNgE?textContent=Profile+Views&textShadow=0&visitsBG=242424&countBG=a8a8a8&visitsText=ffffff&countText=000000" height = 30px/>
```

## How to use

Replace the `{uniqueID}` with a random string and use it as your image source. You may use [this tool](https://ciprand.p3p.repl.co/api?len=20&count=1) to generate an unique random string.

```
https://visits.roshan.cyou/{uniqueID}
```

### Query Parameters for Customization

| Parameter | Use |
| --- | --- |
| textContent | Text to be displayed on the left side of the counter. Space can be encoded like `a%20b` or `a+b` for `a b` |
| textShadow | Toogle the text shadow on or off. The value should be 1 for text shadow and 0 for no text shadow. |
| visitsBG | Background colour of the left part containing the text. |
| countBG | Background colour of the right part containing the visits count. |
| visitsText | Colour of the text on left |
| countText | Colour of the visitor count on right |

**Note -** The colours should be in 6 character hex format without the `#` sign. Google `colour picker` to find the hex code of the colour you want to use.
