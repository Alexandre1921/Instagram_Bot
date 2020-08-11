const puppeteer = require("puppeteer");
const pages = require("../pages");

(async () => {
  //array de páginas alvo
  console.log(pages);
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();

  await page.goto("https://www.instagram.com/accounts/login/");
  await page.waitForSelector('input[name="username"]');
  await page.type('input[name="username"]', "xande1921");
  await page.type('input[name="password"]', "ijfdhqaplsa84a");
  await page.click('button[type="submit"]');

  await page.waitForNavigation();

  await page.type(
    "#react-root > section > nav > div._8MQSO.Cx7Bp > div > div > div.LWmhU._0aCwM > input",
    "Dois vizinhos"
  );

  await page.waitForSelector(".nebtz.coreSpriteLocation");

  await page.evaluate(() => {
    document
      .querySelector(".nebtz.coreSpriteLocation")
      .parentNode.parentNode.click();
  });

  await page.waitForSelector(
    "#react-root > section > main > article > div.EZdmt > div > div > div:nth-child(1) > div:nth-child(1) > a"
  );

  await page.click(
    "#react-root > section > main > article > div.EZdmt > div > div > div:nth-child(1) > div:nth-child(1) > a"
  );

  await page.waitForSelector(
    "body > div._2dDPU.CkGkG > div.zZYga > div > article > header > div.o-MQd.z8cbW > div.PQo_0.RqtMr > div.e1e1d > span > a"
  );

  await page.click(
    "body > div._2dDPU.CkGkG > div.zZYga > div > article > header > div.o-MQd.z8cbW > div.PQo_0.RqtMr > div.e1e1d > span > a"
  );

  await page.waitForSelector(
    "#react-root > section > main > div > header > section > ul > li:nth-child(3) > a"
  );

  await page.click(
    "#react-root > section > main > div > header > section > ul > li:nth-child(3) > a"
  );

  //scroll down
  const scrollable_section = "body > div.RnEpo.Yx5HN > div > div > div.isgrP";

  await page.waitForSelector("body > div.RnEpo.Yx5HN > div > div > div.isgrP");

  await page.evaluate((selector) => {
    let followQtd = Number(
      // coleta a string com numero de seguindo, troca o ponto por vazio, e por fim transforma em numero
      document
        .querySelector(
          "#react-root > section > main > div > header > section > ul > li:nth-child(3) > a > span"
        )
        .innerHTML.replace(".", "")
    );
    let followList = [];
    const scrollableSection = document.querySelector(selector);
    document.body.addEventListener(
      "DOMSubtreeModified",
      function () {
        scrollableSection.scrollTop += 6000; // faz scroll down

        followList = Array.from(
          document.querySelectorAll(
            "body > div.RnEpo.Yx5HN > div > div > div.isgrP > ul > div > li"
          )
        );
        if (followList.length == followQtd) {
          followList = followList.map(
            (user) =>
              user.querySelector("div > div.t2ksc > .enpQJ > .d7ByH > span > a")
                .innerHTML
          );
          console.log(followList);
        } else {
          console.log("Testing");
        }
      },
      false
    );
  }, scrollable_section);
  // await browser.close();
})();
