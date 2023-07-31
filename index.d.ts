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

export function getArticleMetaData(url: string): Promise<ArticleMetadata>;
