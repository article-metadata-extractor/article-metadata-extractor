# Article Metadata Extractor

The Article Metadata Extractor is a JavaScript library that allows you to extract essential metadata from web pages containing articles. It is designed to be used in Node.js 18+.

## How It Works

The library uses the [Cheerio](https://cheerio.js.org/) library to parse and traverse HTML content. It fetches the HTML content of a given URL and extracts the following information from the webpage:

- **Title**: The title of the article.
- **Image**: The illustrative image associated with the article.
- **Author**: The name of the article's author.
- **Tags**: A list of keywords or tags associated with the article.
- **Publication Date**: The date when the article was published.
- **Read Time**: An estimated reading time for the article in minutes.
- **Description**: A short excerpt or description of the article.

## How to Use

1. Install dependency:

```bash
npm install article-metadata-extractor
```

2. Import the getArticleMetaData function into your project and use it:

```js
const url = 'https://example.com/article';

getArticleMetaData(url)
  .then(metadata => {
    console.log(metadata);
    // Use the extracted metadata as needed
  })
  .catch(error => {
    console.error('Error:', error.message);
  });

```

## Output

```ts
/**
 * Represents the extracted metadata from an article's webpage.
 */
interface ArticleMetadata {
  /**
   * The title of the article.
   */
  title: string;

  /**
   * The URL of the illustrative image associated with the article.
   */
  image: string;

  /**
   * The name of the article's author.
   */
  author: string;

  /**
   * An array of keywords or tags associated with the article.
   */
  tags: string[];

  /**
   * The date when the article was published in ISO 8601 format.
   */
  publicationDate: string | null;

  /**
   * An estimated reading time for the article in minutes based on an average reading speed.
   */
  readTime: number;

  /**
   * A short excerpt or description of the article.
   */
  description: string;
}

```

## Licence 

This code is released under the MIT License.

