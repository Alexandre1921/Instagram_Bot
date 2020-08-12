const users = require("../users");
const pages = require("../pages");

console.log(users.length);
result = [];
for (var [key, value] of Object.entries(users)) {
  for (var [key1, value1] of Object.entries(pages.pages)) {
    if (value.username == value1) {
      result.push({ page: value1 });
    }
  }
}
console.log(result);
