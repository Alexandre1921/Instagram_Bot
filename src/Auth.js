module.exports = async (page) => {
  await page.goto("https://www.facebook.com/");
  await page.waitForSelector('input[name="email"]');
  await page.type('input[name="email"]', "gustavoslomski@gmail.com");
  await page.type('input[name="pass"]', "CERES2020!@");
  await page.click('button[type="submit"]');
  await page.waitForNavigation();
};
