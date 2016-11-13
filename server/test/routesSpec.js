/* global define, it, describe, beforeEach, afterEach,  */
import request from 'supertest';
import express from 'express';
import { expect } from 'chai';

import app from '../src/server';

describe('routes', () => {
  it('request to unknown url should return 404', (done) => {
    request(app).get('/somethingfunny').expect(404).end(done);
  });
});
