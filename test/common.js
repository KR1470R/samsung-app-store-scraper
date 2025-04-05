'use strict';

import { assert } from 'chai';
import { isSamsungAppId } from '../lib/common.js';

function assertValidSamsingId (id) {
  return assert(isSamsungAppId(id), `${id} is not a valid samsung app id`);
}

export { assertValidSamsingId };
