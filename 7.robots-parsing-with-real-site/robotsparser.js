const robotParser = require("robots-parser");
const request = require("request-promise");

const robotsUrl = "https://textfiles.meulie.net/robots.txt";

const getRobotsTxt = async (robotsUrl) => {
  const robotsTxt = await request.get(robotsUrl);
  const robots = await robotParser(robotsUrl, robotsTxt);
  console.log(
    robots.isAllowed("https://textfiles.meulie.net/history/", "kunal-bot")
  );
  console.log(
    robots.isAllowed("https://textfiles.meulie.net/history/", "rogerbot")
  );
};

getRobotsTxt(robotsUrl);
