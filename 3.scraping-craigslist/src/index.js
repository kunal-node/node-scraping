const puppeteer = require("puppeteer");

const main = async () => {
  //headless false means show the browser.
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.goto("https://www.google.com");
};

main();
