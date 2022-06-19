const electron = require("electron");
const ipc = electron.ipcRenderer;

const asyncBtn = document.getElementById("asyncBtn");

// Async IPC:
asyncBtn.addEventListener("click", function () {
  // now here we will send/emit the event using ipc with the name to show error dialog
  console.log("async error 1");
  ipc.send("open-async-error-dialog");
  //   send(<event_name>)
  console.log("async error 2");
});

ipc.on("opened-async-error-dialog", function (event, arg) {
  console.log(arg);
});

// Sync IPC
const syncBtn = document.getElementById("syncBtn");

syncBtn.addEventListener("click", function () {
  console.log("sync error 1");
  const replay = ipc.sendSync("open-sync-error-dialog");
  console.log(replay);
  console.log("sync error 2");
});
