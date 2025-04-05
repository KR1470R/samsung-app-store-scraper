'use strict';

const SAMSUNG_APP_STORE_URL = `https://www.samsung.com/us/appstore/app`;
const HEADERS = {
  'User-Agent':
    'Mozilla/5.0 (Linux; Android 10; KFTRWI) AppleWebKit/537.36 (KHTML, like Gecko) Silk/84.4.20 like Chrome/84.0.4147.125 Safari/537.36',
  'Content-Type': 'text/html',
  'Accept': 'text/html',
};

const FETCH_TIMEOUT = 10000; // 10 seconds

export {
  SAMSUNG_APP_STORE_URL,
  HEADERS,
  FETCH_TIMEOUT,
};
