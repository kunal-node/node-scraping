var robotsParser = require("robots-parser");

//Get the robots.txt file with request package, and pass it as 2nd argument.
var robots = robotsParser(
  "http://www.example.com/robots.txt",
  [
    "User-agent: *",
    "Disallow: /dir/",
    "Disallow: /test.html",
    "Allow: /dir/test.html",
    "Crawl-delay: 1",
    "Sitemap: http://example.com/sitemap.xml",
    "Host: example.com",
  ].join("\n")
);

console.log(
  //2nd argument(Sams-Bot/1.0) is a User-Agent string.
  robots.isAllowed("http://www.example.com/test.html", "Sams-Bot/1.0")
); // false
console.log(
  robots.isAllowed("http://www.example.com/dir/test.html", "Sams-Bot/1.0")
); // true
console.log(
  robots.isDisallowed("http://www.example.com/dir/test2.html", "Sams-Bot/1.0")
); // true
console.log(robots.getCrawlDelay("Sams-Bot/1.0")); // 1
console.log(robots.getSitemaps()); // ['http://example.com/sitemap.xml']
console.log(robots.getPreferredHost()); // example.com
