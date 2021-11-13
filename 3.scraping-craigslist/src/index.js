const puppeteer = require("puppeteer");
const cheerio = require("cheerio");

const main = async () => {
  //headless false means show the browser.
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(
    "https://pune.craigslist.org/d/software-qa-dba-etc/search/sof"
  );
  const html = await page.content();
  const $ = cheerio.load(html);
  // const titles = $("a.result-title");
  const titles = $(
    "ul#search-results li.result-row div.result-info h3.result-heading a.result-title"
  );
  const jobs = titles
    .map((index, element) => {
      const title = $(element).text();
      const url = $(element).attr("href");
      return { title, url };
    })
    .get(); // map return the cheerio object's, hence we have to use get method on top of map to get normal objects.
  console.log("jobs : ", jobs);
};

main();
