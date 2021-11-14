const request = require("request-promise");
const cheerio = require("cheerio");

const scrapeResults = [];

const scrapeCraigList = async () => {
  try {
    const html = await request.get(
      "https://sfbay.craigslist.org/d/software-qa-dba-etc/search/sof"
    );
    const $ = cheerio.load(html);
    $(".result-info").each((index, element) => {
      const titleElement = $(element).find(".result-title");
      const title = titleElement.text();
      const url = titleElement.attr("href");
      const datePosted = new Date($(element).find("time").attr("datetime"));
      const scrapeResult = { title, url, datePosted };
      scrapeResults.push(scrapeResult);
    });
  } catch (err) {
    console.log(err);
  }
};

scrapeCraigList();
