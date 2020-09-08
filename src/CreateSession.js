const Auth = require("./Auth");
const LoadSession = require("./LoadSession");
const CreateJson = require("./CreateJson");
const { existsSync } = require("fs");

module.exports = async (page) => {
  const cookiesFilePath = "./json/cookies.json";
  if (existsSync(cookiesFilePath)) {
    console.log("Loading Session");
    await LoadSession(page, cookiesFilePath);
    await page.goto("https://www.instagram.com");
  } else {
    console.log("Creating Session");
    await Auth(page);
    // Save Session Cookies
    const cookiesObject = await page.cookies();
    // Write cookies to temp file to be used in other profile pages
    await CreateJson(
      cookiesFilePath,
      cookiesObject,
      { spaces: 2 },
      "Session has been saved."
    );
  }
};
