const { BrowserWindow, app, dialog, globalShortcut } = require("electron");
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
  win.webContents.on("did-finish-load", () => {});
  // Dialog on key press
  globalShortcut.register("Shift+K", () => {
    // dialog.showOpenDialog();
    // by default this will open file/folder selection

    dialog.showOpenDialog({
      defaultPath: app.getPath("desktop"),
      // now dialog will get open from desktop
      buttonLabel: "select file",
      // we can change the label of selection button
    });
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
