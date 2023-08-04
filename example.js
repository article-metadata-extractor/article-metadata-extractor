import { getArticleMetaData } from './getArticleMetaData.js';

const url = 'https://betterprogramming.pub/all-javascript-and-typescript-features-of-the-last-3-years-629c57e73e42';

console.log((await getArticleMetaData(url)));
