'use strict';

import { assert } from 'chai';
import store from '../index.js';
import { assertValidSamsingId } from './common.js';

const validApp = {
  appId: 'G00002687241',
  title: 'Plex',
};
const invalidApp = {
  appId: '1299192dki1id9o0akodklmsa',
  title: 'Invalid App',
};

describe('App method', () => {
  it('should fetch valid application data', () => {
    store.app({appId: validApp.appId})
      .then((app) => {
        assert.isNotNull(app);
        assertValidSamsingId(app.id);
        assert.equal(app.id, validApp.appId);
        assert.include(app.title, validApp.title);
        assert.isString(app.category);
        assert.isString(app.description);
      });
  });

  it('should return null for invalid app', () => {
    return store.app({appId: invalidApp.appId})
      .then((app) => {
        assert.isNull(app);
      });
  });
});

