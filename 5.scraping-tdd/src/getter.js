const request = require("request-promise");
const fs = require("fs");

const getHtml = async (url) => {
  const html = await request.get(url);
  return html;
};

const saveHtmlToFile = (html) => {
  fs.writeFileSync("./musicians.html", html);
};

const main = async (url) => {
  const html = await getHtml(url);
  saveHtmlToFile(html);
};

main("https://sfbay.craigslist.org/d/musicians/search/muc");
