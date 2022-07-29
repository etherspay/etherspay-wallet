const path = require('path');
const { app, BrowserWindow, ipcMain } = require('electron');

const ipc = ipcMain;

function createWindow() {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    minHeight: 600,
    minWidth: 800,
    webPreferences: {
      nodeIntegration: false, // is default value after Electron v5
      contextIsolation: true, // protect against prototype pollution
      enableRemoteModule: false, // turn off remote
      preload: path.join(__dirname, 'preload.js'), // use a preload script
    },
    autoHideMenuBar: true,
    frame: false,
    icon: path.join(__dirname, 'logo192.png'),
  });

  // and load the index.html of the app.
  if (app.isPackaged) {
    mainWindow.loadFile(path.join(__dirname, 'index.html'));
  } else {
    mainWindow.loadURL('http://localhost:3000');
    mainWindow.webContents.openDevTools();
  }

  // IPC events
  ipc.on('minimize', () => {
    mainWindow.minimize();
  });

  ipc.on('close', () => {
    mainWindow.close();
  });

  ipc.on('maximize', () => {
    if (mainWindow.isMaximized()) {
      mainWindow.unmaximize();
    } else {
      mainWindow.maximize();
    }
  });
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
