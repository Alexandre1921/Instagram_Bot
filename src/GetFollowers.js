const CreateJson = require("./CreateJson");
const { existsSync } = require("fs");

module.exports = async (page, username) => {
  let followers = [];
  const followersPath = "./json/followers.json";
  if (existsSync(followersPath)) {
    console.log("Loading user list");
    followers = require(`.${followersPath}`);
  } else {
    console.log("Creating user list");
    // If file exist load the cookies

    let { followers, success } = await page.evaluate(async (username) => {
      try {
        let followers = [];
        let res = await fetch(`https://www.instagram.com/${username}/?__a=1`);

        res = await res.json();
        let userId = res.graphql.user.id;

        let after = null,
          has_next = true;
        while (has_next) {
          await fetch(
            `https://www.instagram.com/graphql/query/?query_hash=c76146de99bb02f6415203be841dd25a&variables=` +
              encodeURIComponent(
                JSON.stringify({
                  id: userId,
                  include_reel: true,
                  fetch_mutual: true,
                  first: 50,
                  after: after,
                })
              )
          )
            .then((res) => res.json())
            .then((res) => {
              has_next = res.data.user.edge_followed_by.page_info.has_next_page;
              after = res.data.user.edge_followed_by.page_info.end_cursor;
              followers = followers.concat(
                res.data.user.edge_followed_by.edges.map(({ node }) => {
                  return node.username;
                })
              );
            });
        }

        console.log("Followers", followers);
        return { followers, success: true };
      } catch (err) {
        console.log("Invalid username");
        return { followers: [], success: false };
      }
    }, username);

    if (success)
      await CreateJson(
        followersPath,
        followers,
        "utf-8",
        "User list has been saved"
      );
  }
  return followers;
};
