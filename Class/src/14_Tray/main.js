const { BrowserWindow, app, Tray, nativeImage, Menu } = require("electron");
const path = require("path");
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
  const iconPath = path.join(__dirname, "ethereum.png");
  // to create tray of the application
  const tray = new Tray(nativeImage.createFromPath(iconPath));
  // adding toolTip in tray (title/tip on tray hover)
  tray.setToolTip("Electron App");
  // hide/show app on click tray
  tray.on("click", () => {
    win.isVisible() ? win.hide() : win.show();
  });

  // create menu of tray and show on tray icon right click
  let template = [
    {
      label: "item 1",
      // for radio button
      type: "radio",
    },
    {
      label: "item 2",
    },
  ];
  const contextMenu = Menu.buildFromTemplate(template);
  tray.setContextMenu(contextMenu);

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
