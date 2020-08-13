const puppeteer = require("puppeteer");
const fs = require("fs");
const pages = require("../leads/pages");
const list = require("../leads/list");

(async () => {
  //array de páginas alvo
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
  //'#react-root > section > main > article > div.EZdmt > div > div > div > div > a'
  await page.waitForSelector(
    "body > div._2dDPU.CkGkG > div.zZYga > div > article > header > div.o-MQd.z8cbW > div.PQo_0.RqtMr > div.e1e1d > span > a"
  );

  let username = await page.$eval(
    "body > div._2dDPU.CkGkG > div.zZYga > div > article > header > div.o-MQd.z8cbW > div.PQo_0.RqtMr > div.e1e1d > span > a",
    (user) => user.innerText
  );

  if (list.find((v) => v == username) === undefined) {
    let followings = await page.evaluate(
      async (username, pages) => {
        let followings = [];
        try {
          let res = await fetch(`https://www.instagram.com/${username}/?__a=1`);

          res = await res.json();
          let userId = res.graphql.user.id;

          let after = null,
            has_next = true;
          while (has_next) {
            await fetch(
              `https://www.instagram.com/graphql/query/?query_hash=d04b0a864b4b54837c0d870b0e77e076&variables=` +
                encodeURIComponent(
                  JSON.stringify({
                    id: userId,
                    include_reel: true,
                    fetch_mutual: true,
                    first: 50,
                    after,
                  })
                )
            )
              .then((res) => res.json())
              .then((res) => {
                has_next = res.data.user.edge_follow.page_info.has_next_page;
                after = res.data.user.edge_follow.page_info.end_cursor;
                followings = followings.concat(
                  res.data.user.edge_follow.edges.map(({ node }) => {
                    return node.username;
                  })
                );
              });
          }
        } catch (err) {
          console.log("Invalid username");
        }
        let match = false;

        match =
          [...new Set(pages.concat(followings))].length !=
          followings.length + pages.length;
        if (!match) {
          return match;
        }
        return username;
      },
      username,
      pages
    );

    if (followings != false) {
      list.push(followings);
      fs.writeFile(`./leads/list.json`, JSON.stringify(list), "utf8", function (
        err
      ) {
        if (err) {
          console.log("An error occured while writing JSON Object to File.");
          return console.log(err);
        }
        console.log("JSON file has been saved.");
      });
    }
  }
  await browser.close();
})();
