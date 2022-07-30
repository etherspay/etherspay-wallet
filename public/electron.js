const path = require('path');
const { app, BrowserWindow, ipcMain, dialog, shell } = require('electron');

const ipc = ipcMain;

if (process.defaultApp) {
  if (process.argv.length >= 2) {
    app.setAsDefaultProtocolClient('etherspay-wallet', process.execPath, [
      path.resolve(process.argv[1]),
    ]);
  }
} else {
  app.setAsDefaultProtocolClient('etherspay-wallet');
}

function createWindow() {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    resizable: false,
    backgroundColor: '#4B5563',
    webPreferences: {
      nodeIntegration: true, // is default value after Electron v5
      contextIsolation: true, // protect against prototype pollution
      enableRemoteModule: false, // turn off remote
      preload: path.join(__dirname, 'preload.js'), // use a preload script
    },
    autoHideMenuBar: true,
    frame: false,
    icon: path.join(__dirname, 'assets/logo192.png'),
  });

  mainWindow.webContents.on('new-window', function (event, url) {
    event.preventDefault();
    shell.openExternal(url);
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

  // Set protocol handler
  const gotTheLock = app.requestSingleInstanceLock();

  if (!gotTheLock) {
    app.quit();
  } else {
    app.on('second-instance', (event, commandLine, workingDirectory) => {
      // Someone tried to run a second instance, we should focus our window.
      if (mainWindow) {
        if (mainWindow.isMinimized()) mainWindow.restore();
        mainWindow.focus();
      }
    });

    // Handle the protocol. In this case, we choose to show an Error Box.
    app.on('open-url', (event, url) => {
      dialog.showErrorBox('Welcome Back', `You arrived from: ${url}`);
    });
  }
}

app.whenReady().then(createWindow);

// Taskbar customization
app.setUserTasks([
  {
    program: process.execPath,
    arguments: '--new-window',
    iconIndex: 0,
    title: 'Switch network',
    description: 'Switch between different blockchain networks',
  },
  {
    program: process.execPath,
    arguments: '--new-window',
    iconIndex: 0,
    title: 'Create transaction',
    description: 'Create a new transaction with your wallet',
  },
]);

app.on('open-url', (event, url) => {
  dialog.showErrorBox('Welcome Back', `You arrived from: ${url}`);
});

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
