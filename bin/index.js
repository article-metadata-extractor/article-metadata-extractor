#! /usr/bin/env node

import { getArticleMetaData } from '../getArticleMetaData.js';

const url = process.argv[2];

if (!url) {
  console.error('Please provide a URL as an argument.');
  process.exit(1);
}

getArticleMetaData(url)
  .then((metadata) => {
    console.log(metadata);
  })
  .catch((error) => {
    console.error('Error:', error.message);
    process.exit(1);
  });
