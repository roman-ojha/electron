const { BrowserWindow, app, globalShortcut } = require("electron");
app.disableHardwareAcceleration();

let win;

function createWindow() {
  win = new BrowserWindow({
    title: "Electron",
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  });
  win.loadFile("index.html");
  globalShortcut.register("Shift+K", () => {
    // this function will get called when we will press 'K'
    win.loadFile("other.html");
    console.log("Pressed K");
  });
  win.on("closed", () => {
    win = null;
  });
}

app.whenReady().then(() => {
  createWindow();
  // we can also use it after it get ready
  globalShortcut.register("Shift+A", () => {
    console.log("Pressed A");
  });
});

// but we have to make sure that when we close the application these shortcut need to be unregistered
app.on("will-quit", () => {
  globalShortcut.unregisterAll();
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
