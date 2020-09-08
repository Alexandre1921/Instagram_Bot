const puppeteer = require("puppeteer");
const GetFollowers = require("./GetFollowers");
const CreateSession = require("./CreateSession");
const GetUserContent = require("./GetUserContent");

(async () => {
  //array de páginas alvo
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();

  await CreateSession(page);
  let followers = await GetFollowers(page, "alugbr");
  let userContent = await GetUserContent(page, followers);
  console.log(userContent);

  await browser.close();
})();
