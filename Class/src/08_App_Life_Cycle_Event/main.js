const electron = require("electron");
const app = electron.app;

app.disableHardwareAcceleration();

const BrowserWindow = electron.BrowserWindow;

let win;

function createWindow() {
  win = new BrowserWindow({
    width: 900,
    height: 600,
    title: "Electron",
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

// app.whenReady().then(() => {
//   createWindow();
// });
// Ready Event:
app.on("ready", () => {
  createWindow();
  console.log("app is ready to use");
  // check if app is ready or not
  console.warn(app.isReady());
});

app.on("before-quit", (e) => {
  // call before application get exit
  console.log("App Before Quite");
  // e.preventDefault();
  // if we will preventDefault then the application will not get exit
});

app.on("will-quit", () => {
  // in this event application will going to quit
  console.log("App Will Quit");
});

app.on("browser-window-focus", () => {
  // this event will get call when you will focus of the application window
  console.log("App is on focus");
});

app.on("browser-window-blur", () => {
  // this event will get call when you will  unfocus the application window
  console.log("App is not on focus");
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
