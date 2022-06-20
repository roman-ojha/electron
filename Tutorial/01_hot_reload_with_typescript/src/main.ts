const electron = require("electron");
const electronReload = require("electron-reload");
const path = require("path");

const NODE_ENV = process.env.NODE_ENV || "development";

// electronReload(__dirname,{});
if (NODE_ENV === "development") {
  electronReload("./", {});
}
// here now we have to call electron-reload package
// and we have to tell this package from which directory application have to reload

const BrowserWindow = electron.BrowserWindow;
const app = electron.app;
app.disableHardwareAcceleration();

let win: any;

function createWindow() {
  win = new BrowserWindow({
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  });
  win.loadFile("./app/html/index.html");

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
