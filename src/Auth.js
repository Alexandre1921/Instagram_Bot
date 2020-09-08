module.exports = async (page) => {
  await page.goto("https://www.instagram.com/accounts/login/");
  await page.waitForSelector('input[name="username"]');
  await page.type('input[name="username"]', "mohammed_kibe");
  await page.type('input[name="password"]', "Inteligente01");
  await page.click('button[type="submit"]');
  await page.waitForNavigation();
};
