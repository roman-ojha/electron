const { BrowserWindow, webContents, app } = require("electron");
// we can get 'webContents' like this
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
  let wc = win.webContents;
  // you can also get webContents like this
  // this web content is for 'win' windows
  wc.on("dom-ready", () => {
    // this event will get called when dom is ready
    console.log("Dom is ready");
  });
  wc.on("did-finish-load", () => {
    // on all content load like images etc.
    console.log("Finished load");
  });
  // https://www.electronjs.org/docs/latest/api/web-contents#event-new-window-deprecated
  wc.on("before-input-event", () => {
    // get called when key is pressed
    console.log("Some key is pressed");
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
