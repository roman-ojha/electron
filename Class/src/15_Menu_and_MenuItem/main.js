const { BrowserWindow, app, Menu } = require("electron");
app.disableHardwareAcceleration();

// if platform is mac
const isMac = process.platform === "darwin";

// create template for menu
const template = [
  {
    // label of the menu
    label: "File",
    // to create submenu
    submenu: [
      {
        label: "Import",
      },
      {
        label: "Export",
      },
      isMac
        ? {
            label: "Close",
            // if want to exit the application on click for window
            role: "close",
          }
        : {
            label: "Exit",
            role: "quit",
          },
    ],
  },
  {
    label: "Edit",
  },
  {
    label: "Selection",
  },
  {
    label: "View",
  },
  {
    label: "Go",
  },
  // add condition using platform
  ...(isMac
    ? [
        {
          label: "Run",
        },
      ]
    : []),
  ...(isMac
    ? [
        {
          label: "Mac",
        },
      ]
    : [
        {
          label: "Win",
        },
      ]),
];

// inject template on menu
const menu = Menu.buildFromTemplate(template);
Menu.setApplicationMenu(menu);

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
