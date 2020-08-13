let Instagram = require("instagram-nodejs-without-api");
Insta = new Instagram();
const username = process.env.USERNAME;
const password = process.env.PASSWORD;
Insta.commonSearch("Kyiv").then((r) => {
  //get location id for Kyiv
  let locationId = r.places[0].place.location["pk"];
  //search posts from Kyiv
  Insta.searchBy("location", locationId, "0", 12).then((r) => console.log(r));
});
//search posts by hashtag "Eurovision"
Insta.searchBy("hashtag", "Eurovision")
  .then((r) => console.log(r))
  .catch(console.error);
