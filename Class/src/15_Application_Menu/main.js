const { BrowserWindow, app, Menu } = require("electron");
const electron = require("electron");
app.disableHardwareAcceleration();

// if platform is mac
const isMac = process.platform === "darwin";

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

  // create template for menu
  const template = [
    {
      // label of the menu
      label: "File",
      // to create submenu
      submenu: [
        {
          label: "Import",
          // call function on clicking submenu
          click: function () {
            console.log("Importing");
          },
        },
        {
          label: "Export",
        },
        // if you want to add horizontal line between submenu
        {
          type: "separator",
        },
        // predefine menu that electron provide
        // most of the application will have some standard menu like: 'edit', 'view', 'window'
        // add condition using platform
        {
          role: "undo",
        },
        {
          role: "redo",
        },
        {
          type: "separator",
        },
        {
          role: "cut",
        },
        {
          role: "copy",
        },
        {
          role: "paste",
        },
        {
          role: "pasteandmatchstyle",
        },
        {
          role: "delete",
        },
        {
          role: "selectall",
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
      label: "Help",
      click: function () {
        electron.shell.openExternal("https://www.electronjs.org");
      },
    },
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
