'use strict'

const { test } = require('tap')
const build = require('./server').build

test('test that get without post returns an empty array', async t => {
    const app = build();
    const response = await app.inject({
      method: 'GET',
      url: '/task'
    });
    t.equal(response.statusCode, 200, 'returns a status code of 200');
    t.not(response.body, null, 'the body of the response is not null');
    t.equal(JSON.parse(response.body).length, 0, 'returns an empty array');
})

test('test that post saves 1 task', async t => {
  const app = build();
  await app.inject({
    url: '/task',
    method: 'POST',
    body: {
        title: "Hello",
        description: "This is my task"
    }
  });
  const response = await app.inject({
    method: 'GET',
    url: '/task'
  })
  t.equal(response.statusCode, 200, 'returns a status code of 200')
  t.not(response.body, null, 'the body of the response is not null');
  t.equal(JSON.parse(response.body).length, 1, 'returns an empty array');
})
