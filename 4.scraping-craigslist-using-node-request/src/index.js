const request = require("request-promise");
const cheerio = require("cheerio");

const main = async () => {
  try {
    const html = await request.get(
      "https://mumbai.craigslist.org/d/software-qa-dba-etc/search/sof"
    );
  } catch (err) {
    console.log(err);
  }
};
