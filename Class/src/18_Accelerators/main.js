const electron = require("electron");

const BrowserWindow = electron.BrowserWindow;
const app = electron.app;
app.disableHardwareAcceleration();

const Menu = electron.Menu;

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

  win.on("closed", () => {
    win = null;
  });
}

app.whenReady().then(() => {
  createWindow();

  const menu = Menu.buildFromTemplate([
    {
      label: "Help",
      submenu: [
        {
          label: "About",
          click: function () {
            electron.shell.openExternal("https://www.electronjs.org/");
          },
          // if we will not pass role on these menu then we can use our own keyboard shortcut using accelerator
          accelerator: "CmdOrCtrl + Shift + H",
          // based on mac or windows
        },
      ],
    },
  ]);
  Menu.setApplicationMenu(menu);
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
