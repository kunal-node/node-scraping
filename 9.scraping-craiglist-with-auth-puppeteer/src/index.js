const puppeteer = require("puppeteer");
const cheerio = require("cheerio");

const main = async () => {
  try {
    const browser = await puppeteer.launch({ headless: false });
    let page = await browser.newPage();
    await page.goto("https://accounts.craigslist.org/login");
    await page.type("input#inputEmailHandle", "your email", {
      delay: 1000,
    });
    await page.type("input#inputPassword", "your password", {
      delay: 1000,
    });

    await page.click("button#login");
    await page.waitForNavigation();
    page.goto("https://accounts.craigslist.org/login/home?show_tab=settings");
    const content = await page.content();
    const $ = cheerio.load(content);
    console.log($("your selector").text());
  } catch (err) {
    console.error("error : ", err);
  }
};

main();
