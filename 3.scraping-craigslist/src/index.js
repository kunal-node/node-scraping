const puppeteer = require("puppeteer");
const cheerio = require("cheerio");

const scrapeListings = async (page) => {
  await page.goto(
    "https://pune.craigslist.org/d/software-qa-dba-etc/search/sof"
  );
  const html = await page.content();
  const $ = cheerio.load(html);
  // const titles = $("a.result-title");
  const results = $("ul#search-results li.result-row div.result-info");
  const listings = results
    .map((index, element) => {
      const titleElement = $(element).find("h3.result-heading a.result-title");
      const timeElement = $(element).find("time.result-date");
      const hoodElement = $(element).find("span.result-meta span.result-hood");
      const title = titleElement.text();
      const url = titleElement.attr("href");
      const datePosted = new Date(timeElement.attr("datetime"));
      const hood = hoodElement.text().trim().replace("(", "").replace(")", "");
      return { title, url, datePosted, hood };
    })
    .get(); // map return the cheerio object's, hence we have to use get method on top of map to get normal objects.
  return listings;
};

const scrapJobDescriptions = async (listings, page) => {
  //forEach works concurrently, which does not work properly with puppeteer, hence used normal for loop.
  for (let i = 0; i < listings.length; i++) {
    await page.goto(listings[i].url);
    const html = await page.content();
    await sleep(1000); // 1 second sleep.
  }
};

const sleep = async (milliseconds) => {
  return new Promise((resolve) => {
    setTimeout(resolve, milliseconds);
  });
};

const main = async () => {
  //headless false means show the browser.
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  const listings = await scrapeListings(page);
  const listingsWithJobDescriptions = await scrapJobDescriptions(
    listings,
    page
  );
};

main();
