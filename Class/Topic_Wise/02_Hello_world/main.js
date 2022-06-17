console.log("main process working");

const electron = require("electron");
// firstly require electron

// Now require two Sub module
const app = electron.app;
// window for UI
const BrowserWindow = electron.BrowserWindow;

// Module to build our app on specify path url
const path = require("path");

// Create New window that represent the UI
let win; // reference to our window

function createWindow() {
  // Electron provide 'BrowserWindow' API to create and control window
  win = new BrowserWindow();

  //   after a new browser window is created we need to load html file into that browser window

  //   to serve as file
  win.loadFile(path.join(__dirname, "src/index.html"));

  // to serve as URL
  //   win.loadURL(
  //     url.format({
  //       pathname: path.join(__dirname, "index.html"),
  //       protocol: "file",
  //       // we are using system file but url
  //       slashes: true,
  //     })
  //   );

  //   Lastly we need to handle the event when user closes the browser window
  win.on("closed", () => {
    win = null;
    // win to null so that it can be garbage collected
  });
  //   this is and event that is going to emit when you click on close button

  //   Because we are using web technology we can access even access web developer tools
  win.webContents.openDevTools();
}

// so, to create window on 'app' sub module in electron have and event called ready that indicate all initialization is done and we are allow to execute certain code
// app.on("ready", createWindow);
app.whenReady().then(() => {
  createWindow();
});

// For working on Windows Machine this is pretty much done but if you are using mac you need to add more code
app.on("window-all-closed", () => {
  // so if all the browser window are closed you need to explicitly quit the application in you code
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  // again in mac if there are now windows open and you click the doc icon that we need to create a browser window again
  if (win === null) {
    createWindow();
  }
});
