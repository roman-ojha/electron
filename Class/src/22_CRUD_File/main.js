const electron = require("electron");

const BrowserWindow = electron.BrowserWindow;
const app = electron.app;
app.disableHardwareAcceleration();

let win;

function createWindow() {
  win = new BrowserWindow({
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  });
  win.loadFile("index.html");
  win.webContents.openDevTools();

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
