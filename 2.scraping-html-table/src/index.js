// https://www.codingwithstefan.com/table-example/
const fs = require("fs");
const request = require("request-promise");
const cheerio = require("cheerio");

const main = async () => {
  let html = "<h1>Testing</h1>";
  // 1. scraping table data(tr, td) excluding th.
  try {
    html = await request.get("https://www.codingwithstefan.com/table-example/");
  } catch (err) {
    console.log(err);
  }
  fs.writeFileSync("./test.html", html);
  let $ = cheerio.load(html);
  const scrapedRows = [];
  $("body > table > tbody > tr").each((index, element) => {
    // if th return.
    if (index === 0) {
      return true;
    }
    const tds = $(element).find("td");
    const company = $(tds[0]).text();
    const contact = $(tds[1]).text();
    const country = $(tds[2]).text();
    const scrapedRow = { company, country, contact };
    scrapedRows.push(scrapedRow);
  });
  console.log("scrapedData : ", scrapedRows);
};

main();
