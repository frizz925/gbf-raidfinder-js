[![Build Status](https://travis-ci.org/Frizz925/gbf-raidfinder-js.svg?branch=master)](https://travis-ci.org/Frizz925/gbf-raidfinder-js)
[![codecov](https://codecov.io/gh/Frizz925/gbf-raidfinder-js/branch/master/graph/badge.svg)](https://codecov.io/gh/Frizz925/gbf-raidfinder-js)
[![npm version](https://badge.fury.io/js/gbf-raidfinder.svg)](https://badge.fury.io/js/gbf-raidfinder)

# Granblue Raidfinder

## Installation

```sh
npm install gbf-raidfinder
```

## Usage

```js
const Raidfinder = require('gbf-raidfinder');

// Using provided Twitter credentials
let client = new Raidfinder({
  access_token_key: '<ACCESS_TOKEN>',
  access_token_secret: '<ACCESS_TOKEN_SECRET>',
  consumer_key: '<CONSUMER_KEY>',
  consumer_secret: '<CONSUMER_SECRET>'
});

// Using environment variables
// Load env using dotenv package
require('dotenv').config();
client = new Raidfinder({
  access_token_key: process.env.ACCESS_TOKEN,
  access_token_secret: process.env.ACCESS_TOKEN_SECRET,
  consumer_key: process.env.CONSUMER_KEY,
  consumer_secret: process.env.CONSUMER_SECRET
});

// ...or using the shorthand (internally load credentials from env)
client = new Raidfinder();

const tweetHandler = (err, tweet, stream) => {
  if (err) {
    throw new Error(err);
  }

  console.dir(tweet);
  /* Outputs: RaidTweet {
          text: '5869AA6C :参戦ID\n参加者募集！\nLv75 シュヴァリエ・マグナ\nhttps://t.co/1sORKFyv91',
          image: 'https://t.co/1sORKFyv91',
          boss:
          Boss {
            text: 'Lv75 シュヴァリエ・マグナ',
            language: 'jp',
            level: 75,
            name: 'シュヴァリエ・マグナ' },
          language: 'jp',
          raid: Raid { text: '5869AA6C :参戦ID', code: '5869AA6C', message: '' } } */
  // Destroy stream when a tweet is received
  stream.destroy();
};

// Track a single raid boss (Japanese tweet only)
let $stream = client.stream('Lv75 シュヴァリエ・マグナ', tweetHandler);

// Destroy previous stream
$stream.destroy();
// Track multiple raid bosses (Japanese & English tweets)
client.stream(
  [
    'Lvl 75 Luminiera Omega',
    'Lv75 シュヴァリエ・マグナ',
    'Lvl 75 Celeste Omega',
    'Lv75 セレスト・マグナ'
  ],
  tweetHandler
);
```

## License

MIT
