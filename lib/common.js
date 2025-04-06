'use strict';

import * as http from 'http';
import * as https from 'https';
import { URL } from 'url';
import { FETCH_TIMEOUT } from './constants.js';

function fetchGet(urlStr, options = {}, redirectCount = 0, maxRedirects = 5) {
  return new Promise((resolve, reject) => {
    if (redirectCount > maxRedirects) {
      return reject(new Error('Too many redirects'));
    }

    const urlObj = new URL(urlStr);
    const lib = urlObj.protocol === 'https:' ? https : http;

    const req = lib.get(urlStr, options, (res) => {
      const { statusCode, headers } = res;
      const contentType = headers['content-type'];
      const location = headers['location'];

      if ([301, 302, 307, 308].includes(statusCode)) {
        res.resume();
        if (!location) {
          return reject(new Error(`Redirect (${statusCode}) received but no Location header`));
        }
        const nextUrl = new URL(location, urlStr).toString();
        return resolve(fetchGet(nextUrl, options, redirectCount + 1, maxRedirects));
      }

      let data = '';
      res.setEncoding('utf8');

      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        clearTimeout(timeoutId);
        if (statusCode < 200 || statusCode >= 300) {
          return reject(new Error(`Request failed with status code ${statusCode}`));
        }
        try {
          if (contentType?.includes('application/json')) {
            return resolve(JSON.parse(data));
          } else {
            return resolve(data);
          }
        } catch (err) {
          return reject(new Error(`Failed to parse response: ${err.message}`));
        }
      });

      res.on('error', err => {
        clearTimeout(timeoutId);
        reject(err);
      });
    });

    const timeout = options.timeout || FETCH_TIMEOUT;
    const timeoutId = setTimeout(() => {
      req.destroy(new Error('Request timed out'));
    }, timeout);

    req.on('error', (err) => {
      clearTimeout(timeoutId);
      reject(err);
    });

    req.on('close', () => {
      clearTimeout(timeoutId);
    });
  });
}

function extractSamsungAppId(url) {
  try {
    const parsedUrl = new URL(url);

    if (!parsedUrl.hostname === 'www.samsung.com') {
      return null;
    }

    const match = parsedUrl.pathname.match(/\/(G[0-9A-Z]{11})(?=\/|$)/);
    if (!match) {
      return null;
    }

    return match[1];
  } catch (err) {
    return null;
  }
}

function isSamsungAppId(str) {
  return /^G[0-9A-Z]{11}$/.test(str);
}

export {
  fetchGet,
  extractSamsungAppId,
  isSamsungAppId,
};
