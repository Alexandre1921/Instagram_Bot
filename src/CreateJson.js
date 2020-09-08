const fs = require("fs");

module.exports = (path, jsonContent, options, successMessage) => {
  let jsonContentString = JSON.stringify(jsonContent);
  fs.writeFile(path, jsonContentString, options, function (err) {
    if (err) {
      console.log("An error occured while writing JSON Object to File.");
      return console.log(err);
    }

    console.log(successMessage);
  });
};
