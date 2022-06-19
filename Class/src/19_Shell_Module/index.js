const openFolderBtn = document.getElementById("openFolder");
const openFileBtn = document.getElementById("openFile");
const openLinkBtn = document.getElementById("openLink");
const shell = require("electron").shell;
const path = require("path");

openFolderBtn.addEventListener("click", function (event) {
  // to open a folder in you file system so, you have to specify the full path as the argument
  //   shell.showItemInFolder(
  //     "D:\\Programming\\App_Development\\Electron\\Class\\src\\19_Shell_Module\\demo.txt"
  //   );
  //   OR
  shell.showItemInFolder(path.join(__dirname, "demo.txt"));
});

openFileBtn.addEventListener("click", function (event) {
  // we can also open file directly
  shell.openExternal(path.join(__dirname, "demo.txt"));
});

openLinkBtn.addEventListener("click", function (event) {
  // we can also open external link
  shell.openExternal("https://www.electronjs.org");
});
