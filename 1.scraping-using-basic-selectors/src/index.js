const fs = require("fs");
const request = require("request-promise");
const cheerio = require("cheerio");

const main = async () => {
  let html = "<h1>Testing</h1>";
  // 1. Fetch text of an h1 element.
  try {
    html = await request.get("https://reactnativetutorial.net/css-selectors/");
  } catch (err) {
    console.log(err);
  }
  fs.writeFileSync("./test.html", html);
  let $ = cheerio.load(html);
  let text = $("h1").text();
  console.log(text);

  // 2. Fetch multiple h1 element.
  try {
    html = await request.get(
      "https://reactnativetutorial.net/css-selectors/lesson2.html"
    );
  } catch (err) {
    console.log(err);
  }
  $ = cheerio.load(html);
  text = $("h2").each((index, element) => {
    const text = $(element).text();
    console.log(text);
  });

  // 3. Fetch element by id.
  try {
    html = await request.get(
      "https://reactnativetutorial.net/css-selectors/lesson3.html"
    );
  } catch (err) {
    console.log(err);
  }
  $ = cheerio.load(html);
  text = $("#red").text();
  console.log(text);

  // 4.Fetch element by className.
  try {
    html = await request.get(
      "https://reactnativetutorial.net/css-selectors/lesson5.html"
    );
  } catch (err) {
    console.log(err);
  }
  $ = cheerio.load(html);
  text = $("h2.red").each((index, element) => {
    const text = $(element).text().trim();
    console.log(text);
  });

  // 5.fetch element by attribute name.
  try {
    html = await request.get(
      "https://reactnativetutorial.net/css-selectors/lesson6.html"
    );
  } catch (err) {
    console.log(err);
  }
  $ = cheerio.load(html);
  $("[data-customer]").each((idx, ele) => {
    const text = $(ele).text().trim();
    console.log(text);
  });
};

main();
