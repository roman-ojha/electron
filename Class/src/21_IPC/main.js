const electron = require("electron");

const BrowserWindow = electron.BrowserWindow;
const app = electron.app;
app.disableHardwareAcceleration();

const ipc = electron.ipcMain;
const dialog = electron.dialog;

let win;

function createWindow() {
  win = new BrowserWindow({
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  });
  win.loadFile("index.html");

  win.on("closed", () => {
    win = null;
  });
}

// Async IPC
// now in the main Process we will listen to that event that is emitted by renderer process and perform some action
ipc.on("open-async-error-dialog", function (event) {
  // now here we are able to communicate from renderer process to main process
  dialog.showErrorBox("An error message", "Demo of an error message");
  // showErrorBox(<title_of_error>,<body_of_error>)

  // now again we will replay/communicate from main process to render process
  event.sender.send(
    "opened-async-error-dialog",
    "Main process async IPC replay"
  );
  // send(<event_name>,<message_to_renderer_process>)
  // sender: we want to send message to the same renderer process that emit the event
});

// Sync IPC:
ipc.on("open-sync-error-dialog", function (event) {
  dialog.showErrorBox("An error message", "Demo of an error message");
  event.returnValue = "Main process sync IPC replay";
});

app.whenReady().then(() => {
  createWindow();
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (win === null) {
    createWindow();
  }
});
