const electron = require("electron");
const app = electron.app;

app.disableHardwareAcceleration();

const BrowserWindow = electron.BrowserWindow;

let win1;

function createWindow() {
  win1 = new BrowserWindow({
    // width of window
    width: 800,
    // height of window
    height: 600,
    // to hide/show upper frame bar
    frame: true,
    // to add background color on window
    backgroundColor: "#ff0000",
    // to always put window on top of all application
    alwaysOnTop: true,
    // to add title of app at the top NOTE: only work if you haven't add title on html
    title: "Roman",
    // if you don't want app to be resizable
    resizable: false,
    // For More Property
    // https://www.electronjs.org/docs/latest/api/browser-window
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  });

  win1.loadFile("index.html");

  win1.webContents.openDevTools();

  win1.on("closed", () => {
    win1 = null;
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
  if (win1 === null) {
    createWindow();
  }
});
