'use strict';

import * as R from 'ramda';
import * as memoizee from 'memoizee';
import * as  constants from './lib/constants.js';
import app from './lib/app.js';

const methods = {
  app,
};

function memoized(opts) {
  const cacheOpts = Object.assign({
    primitive: true,
    normalizer: JSON.stringify,
    maxAge: 1000 * 60 * 5, // cache for 5 minutes
    max: 1000 // save up to 1k results to avoid memory issues
  }, opts);
  const doMemoize = (fn) => memoizee(fn, cacheOpts);
  return Object.assign({}, constants, R.map(doMemoize, methods));
}

export default Object.assign({memoized}, constants, methods);
