# Contributing

I am open to, and grateful for, any contributions made by the community to help develop this discord bot. Please go through this document once completely before you contribute or open a pull request.

## Made With

- Node and Express for the backend
- React for the customization web tool
- MonogDB as the database
- Moongoose for interacting with MongoDB
- Microsoft Azure for hosting

## Directories

| **File or Folder** | **Use** |
| --- | --- |
| index.js | Main entry file which starts the backend server |
| database | mongo.js contains the database opertion, and schema.js contains the document schema |
| frontend/src | React based customization web tool |
| frontend/src/svgBadge.js | Creates the SVG badge for both the frontend and backend |

## config.json

This file should be created and placed in the same place as the index.js file. The content is as given below.

```json
{
    "port": 3000,
    "mongourl": "mongodb://localhost/visitscounter"
}
```

## Developing

1. Clone this repo
2. Run `npm run install` once to install all dependencies.
3. Run `npm run site` in one terminal window, and `npm run server` in another terminal window for testing.

## Submit

Open a pull request with your changes describing in the best possible way what you have done.