// here Main Process is responsible for creating Graphical user interface by creating web pages using the browser windows
console.log("Main.js");
const electron = require("electron");
const app = electron.app;

// for 'Passthrough is not supported, GL is disabled, ANGLE is' error I think
app.disableHardwareAcceleration();

const BrowserWindow = electron.BrowserWindow;
const path = require("path");

let win1, win2;
// so in each window in this case one window 'win1' have there own process known as render process and the render process are isolated from each other
// so if there are multiple browser window then render process from each of them will not conflict
// this is the uses of chromium multi process architecture
// NOTE: so in electron application there will be one main process and multiple render process

function createWindow() {
  win1 = new BrowserWindow({
    // to be able to use 'require' syntax we have to had these line
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  });

  // creating another window
  win2 = new BrowserWindow({
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  });

  win1.loadFile(path.join(__dirname, "indexOne.html"));
  win2.loadFile(path.join(__dirname, "indexTwo.html"));

  win1.webContents.openDevTools();
  win2.webContents.openDevTools();

  win1.on("closed", () => {
    win1 = null;
  });
  win2.on("closed", () => {
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
