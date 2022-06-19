const electron = require("electron");

const BrowserWindow = electron.BrowserWindow;
const app = electron.app;
app.disableHardwareAcceleration();

let win;

function createWindow() {
  win = new BrowserWindow({
    height: 150,
    width: 500,
    // after we make frame false it will like widget
    frame: false,
    // because when application get start first the application show while screen which is not a good visual effect because of that we have to do this
    show: false,
    // we will make browser show false means that we will not show at the first
    // and only when application get ready we will show the application
    resizable: false,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  });
  win.loadFile("index.html");
  win.on("ready-to-show", () => {
    // We will show the application when it is ready to show
    win.show();
  });

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
