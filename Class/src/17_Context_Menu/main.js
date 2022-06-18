const electron = require("electron");

const BrowserWindow = electron.BrowserWindow;
const app = electron.app;
app.disableHardwareAcceleration();

// For Context Menu we will use to sub module of election
const menu = electron.Menu;
const menuItem = electron.MenuItem;

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

  // create menu
  const ctxMenu = new menu();
  // append menu item on menu
  ctxMenu.append(
    new menuItem({
      label: "Hello",
      click: function () {
        console.log("Context Menu");
      },
    })
  );
  // can again append new menu item
  ctxMenu.append(
    new menuItem({
      label: "Select",
      role: "selectAll",
    })
  );

  // attached context menu on click event on browser window
  win.webContents.on("context-menu", function (e, params) {
    ctxMenu.popup(win, params.x, params.y);
  });
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
