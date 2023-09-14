import { load } from 'cheerio';
import fetch from 'node-fetch';

function getTitle(_$) {
  /**
   * @type {import('cheerio/lib/load').CheerioAPI}
   */
  const $ = _$
  return $("title").text() ||
    $("meta[name='title']").attr("content") ||
    document.title ||
    ($("h1").length > 0 ? $("h1").text() : '') ||
    '';
}

function getImage(_$) {
  /**
   * @type {import('cheerio/lib/load').CheerioAPI}
   */
  const $ = _$
  return $("meta[property='og:image']").attr("content") ||
    $("meta[name='twitter:image']").attr("content") ||
    $("meta[itemprop='image']").attr("content") ||
    $("meta[name='image']").attr("content");
}

function getAuthor(_$) {
  /**
   * @type {import('cheerio/lib/load').CheerioAPI}
   */
  const $ = _$;
  return $("meta[name='author']").attr("content") ||
    $("meta[property='article:author']").attr("content") ||
    $("meta[name='twitter:creator']").attr("content") ||
    $("meta[name='twitter:site']").attr("content") ||
    $("meta[property='og:site_name']").attr("content") ||
    '';
}

function getTags(_$) {
  /**
   * @type {import('cheerio/lib/load').CheerioAPI}
   */
  const $ = _$;

  const tags =
    $("meta[name='keywords']").attr("content") ||
    $("meta[property='article:tag']").attr("content") ||
    $("meta[name='news_keywords']").attr("content") ||
    $("meta[name='sailthru.tags']").attr("content") ||
    $("meta[name='parsely-tags']").attr("content") ||
    '';

  const allCommaAndSpaces = /[, ]+/;
  return tags.split(allCommaAndSpaces).filter(tag => tag.trim() !== '');
}

function getPublicationDate(_$) {
  /**
   * @type {import('cheerio/lib/load').CheerioAPI}
   */
  const $ = _$;

  const date =
    $("meta[name='date']").attr("content") ||
    $("meta[property='article:published_time']").attr("content") ||
    $("meta[name='article:published_time']").attr("content") ||
    $("meta[name='dc.date']").attr("content") ||
    $("meta[name='dc.date.issued']").attr("content") ||
    $("meta[name='pubdate']").attr("content") ||
    $("time[itemprop='datePublished']").attr("datetime") ||
    $("time[pubdate]").attr("datetime") ||
    $("meta[property='og:article:published_time']").attr("content") ||
    $("meta[name='parsely-pub-date']").attr("content") ||
    '';

  const standardizedDate = new Date(date);

  return standardizedDate?.toString() !== "Invalid Date" ? standardizedDate.toISOString() : null;
}

function getReadTime(_$, options = {wordsPerMinute: 100}) {
  /**
   * @type {import('cheerio/lib/load').CheerioAPI}
   */
  const $ = _$;

  const content = $("article").text();
  const anyWhiteSpace = /\s+/;
  const wordCount = content.trim().split(anyWhiteSpace).length;
  const readTimeInMinutes = Math.ceil(wordCount / options.wordsPerMinute);
  return readTimeInMinutes;
}

function getDescription(_$) {
  /**
   * @type {import('cheerio/lib/load').CheerioAPI}
   */
  const $ = _$;

  return $("meta[name='description']").attr("content") ||
    $("meta[property='og:description']").attr("content") ||
    $("meta[name='twitter:description']").attr("content") ||
    $("meta[name='dc.description']").attr("content") ||
    $("meta[name='summary']").attr("content") ||
    $("article p").first().text() ||
    '';
}

function isValidUrl(url) {
  try {
    new URL(url);
    return true;
  } catch (error) {
    return false;
  }
}

export function getArticleMetaData(url) {
  if (!isValidUrl(url)) {
    return Promise.reject(new Error("Invalid URL"));
  }
  return fetch(url)
    .then(response => response.text())
    .then(html => {
      const $ = load(html);
      return {
        image: getImage($),
        title: getTitle($),
        author: getAuthor($),
        tags: getTags($),
        publicationDate: getPublicationDate($),
        readTime: getReadTime($),
        description: getDescription($),
      }
    })
    .catch(error => console.error("Error fetching URL:", error));
}

