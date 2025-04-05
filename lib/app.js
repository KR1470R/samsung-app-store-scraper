'use strict';

import { fetchGet } from './common.js';
import cheerio from 'cheerio';
import assert from 'assert';
import {
  SAMSUNG_APP_STORE_URL,
  HEADERS,
} from './constants.js';

/**
 * Fetches app details from Samsung App Store.
 * @param {Object} options - The options for fetching app details.
 * @param {string} options.appId - The ASIN of the app (required).
 * @param {string} [options.lang] - The language code (optional). i.e. 'en_US'
 * @param {string} [options.currency] - The currency code (optional). i.e. 'USD'
 * @returns {Promise<Object|null>} - A promise that resolves to the app details or null if not found.
 */
async function app(options) {
  try {
    assert(options?.appId, 'appId is required.');

    const reqUrl = `${SAMSUNG_APP_STORE_URL}/${options.appId}`;

    const data = await fetchGet(
      reqUrl, 
      {
        headers: HEADERS,
        method: 'get',
      }
    );
    if (!data) throw new Error('No data received on fetch');

    const $ = cheerio.load(data);

    const title = $('div.title-price-contain').text().trim() || null;
    const category = $('.main-info .category-move a')
      .clone()
      .children()
      .remove()
      .end()
      .text()
      .trim() || null;
    const description = $('.app-info p').text()?.trim() || null;

    if (!title) {
      throw new Error('App title not found');
    }

    return { id: options.appId, title, category, description };
  } catch (error) {
    console.error(`Error fetching samsung app "${options.appId}" details:`, error.message);
    return null;
  }
}

export default app;
