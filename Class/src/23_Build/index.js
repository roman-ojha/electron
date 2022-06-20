// whenever we are working with file we will use of 'fs' package comes build in node
const fs = require("fs");
const path = require("path");

const btnCreate = document.getElementById("btnCreate");
const btnRead = document.getElementById("btnRead");
const btnDelete = document.getElementById("btnDelete");
const fileName = document.getElementById("fileName");
const fileContents = document.getElementById("fileContents");

// path where we will perform file operation
let pathName = path.join(__dirname, "Files");

// Create/Update File
btnCreate.addEventListener("click", function () {
  // get complete path with file name to create/update the file
  let file = path.join(pathName, fileName.value);
  let content = fileContents.value;
  fs.writeFile(file, content, function (err) {
    if (err) {
      return console.log(err);
    }
    console.log("Created File successfully");
  });
});

// Read File
btnRead.addEventListener("click", function () {
  let file = path.join(pathName, fileName.value);
  fs.readFile(file, function (err, data) {
    if (err) {
      return console.log(err);
    }
    fileContents.value = data;
    console.log("Read File successfully");
  });
});

// Delete File
btnDelete.addEventListener("click", function () {
  let file = path.join(pathName, fileName.value);
  fs.unlink(file, function (err) {
    if (err) {
      return console.log(err);
    }
    fileName.value = "";
    fileContents.value = "";
    console.log("Delete File Successfully");
  });
});
