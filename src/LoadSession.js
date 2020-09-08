module.exports = async (page, cookiesFilePath) => {
  const cookiesArr = require(`.${cookiesFilePath}`);
  if (cookiesArr.length !== 0) {
    for (let cookie of cookiesArr) {
      await page.setCookie(cookie);
    }
  }
};
