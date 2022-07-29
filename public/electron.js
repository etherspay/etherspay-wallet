const path = require("path");
const { app, BrowserWindow } = require("electron");

function createWindow() {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
    },
  });

  // and load the index.html of the app.
  if (app.isPackaged) {
    mainWindow.loadFile(path.join(__dirname, "index.html"));
  } else {
    mainWindow.loadURL("http://localhost:3000");
  }

  // Open the DevTools.
  mainWindow.webContents.openDevTools();
}

app.whenReady().then(createWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
