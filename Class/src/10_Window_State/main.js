const electron = require("electron");
const windowStateKeeper = require("electron-window-state");
const app = electron.app;

app.disableHardwareAcceleration();

const BrowserWindow = electron.BrowserWindow;

let win;

function createWindow() {
  let mainWindowState = windowStateKeeper({
    defaultHeight: 900,
    defaultHeight: 600,
  });
  win = new BrowserWindow({
    // for height & width
    width: mainWindowState.width,
    height: mainWindowState.height,
    // for position
    x: mainWindowState.x,
    y: mainWindowState.y,
    title: "Electron",
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  });
  win.loadFile("index.html");
  mainWindowState.manage(win);
  win.webContents.openDevTools();
  win.on("closed", () => {
    win = null;
  });
}

app.whenReady().then(() => {
  createWindow();
});

app.on("window-all-closed", () => {
  // when all the window get closed
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (win === null) {
    createWindow();
  }
});
