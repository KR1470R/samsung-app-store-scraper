# samsung-app-store-scraper
Node.js module to scrape application data from the Samsung app store.

## Related Projects
* [amazon-app-store-scraper](https://github.com/KR1470R/amazon-app-store-scraper): a scraper with a similar interface for the Amazon App Store.
* [roku-store-scraper](https://github.com/KR1470R/roku-store-scraper): a scraper with a similar interface for the Roku App Store.
* [galaxy-store-scraper](https://github.com/KR1470R/galaxy-store-scraper): a scraper with a similar interface for the Galaxy Store.

## Inspired by projects:
* [app-store-scraper](https://github.com/facundoolano/app-store-scraper): a scraper with a similar interface for the iTunes app store.
* [google-play-scraper](https://github.com/facundoolano/google-play-scraper): a scraper with a similar interface for the Google Play.

## ⚠️ Notes
This project is under development, thus a lot of things(most) are not implemented yet.\
**Feel free to contribute!**

The API contract of this module adhered to the contract of the projects listed above.

## Installation
```
npm install samsung-app-store-scraper
```

## Usage
Available methods:
- [app](#app): Retrieves the full detail of an application.

### app

Retrieves the full detail of an application. Options:

* `appId`: the package id of the application (the id route on the url).

Example:

```javascript
import samsungStoreScraper from "samsung-app-store-scraper";

samsungStoreScraper.app({appId:  'G00002687241'})
  .then(console.log, console.log);
```
Results:
```javascript
{
  id: 'G00002687241',
  title: 'Plex',
  category: 'Videos',
  description: 'The Plex application allows you to use your Samsung device to browse and play your videos using the Plex Media Server installed on your Mac, PC or Linux computer. Experience your media on a visually stunning, easy to use interface on your TV. Your media has never looked this good!YOU MUST HAVE THE PLEX MEDIA SERVER INSTALLED AND RUNNING ON YOUR NETWORK TO STREAM MEDIA, GET IT AT https://plex.tv/downloadsDoes this App work on my Samsung device?\n' +
    '                                    Check your deviceG15147002586SAMSUNG TV PLUS\n' +
    '                                    or\n' +
    '                                    See all compatible\n' +
    '                                        devices.G15147002586\n' +
    '                                Find answers to common issues about Samsung Apps and how it works.Read More ArticlesSee More Videos'
}
```
If app does not exist  the following value will be resolved:
```javascript 
null
``` 
