const CreateJson = require("./CreateJson");
const { existsSync } = require("fs");

module.exports = async (page, followers) => {
  let userContent = [];
  const userContentPath = "./json/userContent.json";
  if (existsSync(userContentPath)) {
    console.log("Loading user content");
    userContent = require(`.${userContentPath}`);
  } else {
    console.log("Creating user content");
    for (var i = 0; i < followers.length; i++) {
      console.log(followers[i], i);
      userContent.push(
        await page.evaluate(async (username) => {
          try {
            let data;
            console.log(username);
            await fetch(`https://www.instagram.com/${username}/?__a=1`)
              .then((res) => res.json())
              .then((res) => {
                let {
                  username,
                  full_name,
                  biography,
                  id,
                  business_email,
                  connected_fb_page,
                  is_business_account,
                  is_private,
                  is_verified,
                  external_url,
                } = res.graphql.user;
                data = {
                  username,
                  full_name,
                  biography,
                  id,
                  business_email,
                  connected_fb_page,
                  is_business_account,
                  is_private,
                  is_verified,
                  external_url,
                  success: true,
                };
              });
            return data;
          } catch (err) {
            console.log("Invalid username");
            return { user: { success: false } };
          }
        }, followers[i])
      );
    }

    await CreateJson(
      userContentPath,
      userContent,
      "utf-8",
      "User list has been saved"
    );
  }
  return userContent;
};
