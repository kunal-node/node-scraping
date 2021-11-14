const request = require("request-promise");
const cheerio = require("cheerio");

const scrapeJobHeader = async () => {
  const scrapeResults = [];
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
      const hood = $(element).find(".result-hood").text();
      const scrapeResult = { title, url, datePosted, hood };
      scrapeResults.push(scrapeResult);
    });
    return scrapeResult;
  } catch (err) {
    console.log(err);
  }
};

const scrapeDescription = async (jobsWithHeaders) => {
  return await Promise.all(
    jobsWithHeaders.map(async (job) => {
      try {
        const htmlResult = await request.get(job.url);
        const $ = await cheerio.load(htmlResult);
        $(".print-qrcode-container").remove();
        job.description = $("#postingbody").text();
        job.address = $("div.mapaddress").text();
        return job;
      } catch (error) {
        console.error(error);
      }
    })
  );
};

const scrapCraigList = async () => {
  const jobsWithHeaders = await scrapeJobHeader();
  const jobsFullData = await scrapeDescription(jobsWithHeaders);
  console.log(jobsFullData);
};

scrapCraigList();
