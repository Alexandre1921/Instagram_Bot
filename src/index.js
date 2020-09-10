const puppeteer = require("puppeteer");
const GetFollowers = require("./GetFollowers");
const CreateSession = require("./CreateSession");
const GetUserContent = require("./GetUserContent");

(async () => {
  //array de páginas alvo
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();

  await CreateSession(page);

  let response = await page.evaluate(async () => {
    try {
      let fb_dtsg = "AQFhChgqVOrF:AQGOetwKBH4D",
        doc_id = "3387931334604536",
        variables = {
          count: 10,
          cursor:
            "AQHRLXvM0SWH-oZ65T5912QjWKxQSIYqBD092mIME9jlZi2Q8xH9Yb8GJb97mcmXiESUNNAyPaddBs1IX4oiWrD3EA",
          groupID: "320573804816194",
          scale: 1,
          id: "320573804816194",
        };
      await fetch("/api/graphql/", {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: `fb_dtsg=${encodeURIComponent(
          fb_dtsg
        )}&variables=${encodeURIComponent(
          JSON.stringify(variables)
        )}&doc_id=${encodeURIComponent(doc_id)}`,
        method: "post",
      }).then((res) => (response = res));
      return response;
    } catch (err) {
      console.log(err);
      return "ERRO";
    }
  });
  console.log(response);
  await browser.close();
})();
