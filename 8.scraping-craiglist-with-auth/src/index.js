//pass cookies for any subsequent request using defaults({jar: true})
const request = require("request-promise").defaults({ jar: true });
const fs = require("fs");
const main = async () => {
  try {
    const homeHtml = await request.post(
      "https://accounts.craigslist.org/login",
      {
        form: {
          inputEmailHandle: "type-your-email",
          inputPassword: "type-your-password",
        },
        //By default, http response codes other than 2xx will cause the promise to be rejected.
        //This can be overwritten by setting options.simple = false, as here we are getting 302.
        simple: false,
        followAllRedirects: true,
      }
    );
    fs.writeFileSync("./home.html", homeHtml);
    //get settings page..
    const settingsHtml = request.get(
      "https://accounts.craigslist.org/login/home?show_tab=settings"
    );
    fs.writeFileSync("./settings.html", settingsHtml);
  } catch (err) {
    console.error("error : ", err);
  }
};

main();
