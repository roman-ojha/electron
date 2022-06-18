const electron = require("electron");
const app = electron.app;

app.disableHardwareAcceleration();

const BrowserWindow = electron.BrowserWindow;

let win;

function createWindow() {
  win = new BrowserWindow({
    width: 800,
    height: 600,
    title: "Electron",
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  });
  let child = new BrowserWindow({
    parent: win,
    // to create child window from main process we have to make onw window as parent window
  });
  // to load html document in child window
  child.loadFile("child.html");
  // to load/show child window
  child.show();
  win.loadFile("index.html");

  win.on("closed", () => {
    win = null;
  });
}

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
