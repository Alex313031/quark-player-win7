const { app, BrowserWindow, Menu } = require('electron');
const path = require('path');
const electronLog = require('electron-log');
// Export app info
const appName = app.getName();
const appVersion = app.getVersion();
const userHome = app.getPath('home');
const userDataDir = app.getPath('userData');
const userLogFile = path.join(userDataDir, 'logs/main.log');
const userMacLogFile = path.join(userHome, 'Library/Logs', appName, 'main.log');

module.exports = (helpWindow) => {
  // Globally export what OS we are on
  const isWin = process.platform === 'win32';
  const isMac = process.platform === 'darwin';

  // Enable remote module on sub-windows
  require('@electron/remote/main').enable(helpWindow.webContents);

  return Menu.buildFromTemplate([
    {
      label: appName,
      role: 'appMenu',
      submenu: [
        {
          label: 'Go Back',
          accelerator: 'Alt+Left',
          click(item, focusedWindow) {
            if (focusedWindow) focusedWindow.webContents.goBack();
            const currentURL = focusedWindow.webContents.getURL();
            electronLog.info('Navigated backward to ' + [ currentURL ]);
          }
        },
        {
          label: 'Go Forward',
          accelerator: 'Alt+Right',
          click(item, focusedWindow) {
            if (focusedWindow) focusedWindow.webContents.goForward();
            const currentURL = focusedWindow.webContents.getURL();
            electronLog.info('Navigated forward to ' + [ currentURL ]);
          }
        },
        { type: 'separator' },
        {
          label: 'Close Window',
          accelerator: 'CmdorCtrl+W',
          click(item, focusedWindow) {
            if (focusedWindow) focusedWindow.close();
            electronLog.info('Closed a Window');
          }
        },
        {
          label: 'Quit ' + appName,
          accelerator: 'CmdOrCtrl+Q',
          role: 'quit'
        }
      ]
    },
    {
      role: 'viewMenu',
      submenu: [
        {
          label: 'Reload',
          accelerator: 'CmdOrCtrl+R',
          click(item, focusedWindow) {
            if (focusedWindow) focusedWindow.webContents.reload();
          }
        },
        {
          label: 'Force Reload',
          accelerator: 'CmdOrCtrl+Shift+R',
          click(item, focusedWindow) {
            if (focusedWindow) focusedWindow.webContents.reloadIgnoringCache();
          }
        },
        {
          label: 'Toggle Developer Tools',
          accelerator: isMac ? 'Alt+Command+I' : 'Ctrl+Shift+I',
          click(item, focusedWindow) {
            const currentURL = focusedWindow.webContents.getURL();
            electronLog.info('Toggling Developer Tools on ' + currentURL);
            focusedWindow.webContents.toggleDevTools();
          }
        },
        { type: 'separator' },
        { role: 'resetZoom' },
        { role: 'zoomIn' },
        { role: 'zoomOut' },
        { type: 'separator' },
        { role: 'togglefullscreen' }
      ]
    },
    {
      label: 'Developer',
      submenu: [
        {
          label: 'Reload F5',
          accelerator: 'F5',
          visible: false,
          acceleratorWorksWhenHidden: true,
          click(item, focusedWindow) {
            if (focusedWindow) focusedWindow.webContents.reload();
          }
        },
        {
          label: 'Open Log File',
          click() {
            if (isMac) {
              electronLog.info('Opening ' + [ userMacLogFile ]);
              const logWindow = new BrowserWindow({ width: 600, height: 768, useContentSize: true, title: userMacLogFile });
              logWindow.loadFile(userMacLogFile);
            } else {
              electronLog.info('Opening ' + [ userLogFile ]);
              const logWindow = new BrowserWindow({ width: 600, height: 768, useContentSize: true, title: userLogFile });
              logWindow.loadFile(userLogFile);
            }
          }
        },
        { type: 'separator' },
        {
          label: 'Open Electron DevTools',
          accelerator: isMac ? 'Cmd+Shift+F12' : 'F12',
          click(item, focusedWindow) {
            electronLog.info('Opening Electron DevTools on mainWindow.');
            focusedWindow.openDevTools({ mode: 'detach' });
          }
        },
        {
          label: 'Open Electron DevTools Extra',
          accelerator: 'Ctrl+Shift+F12',
          visible: false,
          acceleratorWorksWhenHidden: true,
          click(item, focusedWindow) {
            electronLog.info('Opening Electron DevTools on mainWindow.');
            focusedWindow.openDevTools({ mode: 'detach' });
          }
        },
        {
          label: 'Open chrome://gpu',
          accelerator: 'CmdorCtrl+Alt+G',
          click() {
            const gpuWindow = new BrowserWindow({ width: 900, height: 700, useContentSize: true, title: 'GPU Internals' });
            gpuWindow.loadURL('chrome://gpu');
            electronLog.info('Opened chrome://gpu');
          }
        },
        {
          label: 'Open chrome://process-internals',
          accelerator: 'CmdorCtrl+Alt+P',
          click() {
            const procsWindow = new BrowserWindow({ width: 900, height: 700, useContentSize: true, title: 'Process Model Internals' });
            procsWindow.loadURL('chrome://process-internals');
            electronLog.info('Opened chrome://process-internals');
          }
        },
        {
          label: 'Open chrome://media-internals',
          accelerator: 'CmdorCtrl+Alt+M',
          click() {
            const mediaWindow = new BrowserWindow({ width: 900, height: 700, useContentSize: true, title: 'Media Internals' });
            mediaWindow.loadURL('chrome://media-internals');
            electronLog.info('Opened chrome://media-internals');
          }
        },
        {
          label: 'Open chrome://histograms',
          visible: process.env.QUARK_TEST === '1',
          click() {
            const histogramWindow = new BrowserWindow({ width: 900, height: 700, useContentSize: true, title: 'Histogram Internals' });
            histogramWindow.loadURL('chrome://histograms');
            electronLog.info('Opened chrome://histograms');
          }
        },
        {
          label: 'Restart App',
          click() {
            app.emit('restart-confirm');
          }
        }
      ]
    },
    {
      role: 'help',
      label: 'About',
      submenu: [
        { label: appName + ' v' + appVersion, enabled: false },
        {
          label: 'Created by Oscar Beaumont &&',
          click() {
            new BrowserWindow({ width: 1024, height: 768, useContentSize: true }).loadURL('https://github.com/oscartbeaumont/ElectronPlayer#readme');
          }
        },
        {
          label: 'Maintained by Alex313031',
          click() {
            new BrowserWindow({ width: 1024, height: 768, useContentSize: true }).loadURL('https://github.com/Alex313031/quark-player#readme');
          }
        },
        { type: 'separator' },
        {
          label: 'View Humans.txt',
          accelerator: 'CmdorCtrl+Alt+Shift+H',
          click() {
            const humansWindow = new BrowserWindow({ width: 532, height: 600, useContentSize: true, title: 'humans.txt' });
            humansWindow.loadFile('./ui/humans.txt');
            electronLog.info('Opened humans.txt :)');
          }
        },
        {
          label: 'View License',
          accelerator: 'CmdorCtrl+Alt+Shift+L',
          click() {
            const licenseWindow = new BrowserWindow({ width: 532, height: 550, useContentSize: true, title: 'License' });
            licenseWindow.loadFile('./ui/license.md');
            electronLog.info('Opened license.md');
          }
        },
        {
          label: 'About App',
          accelerator: 'CmdorCtrl+Alt+A',
          click() {
            const aboutWindow = new BrowserWindow({
              width: 512,
              height: 500,
              useContentSize: true,
              autoHideMenuBar: false,
              skipTaskbar: false,
              title: 'About ' + appName,
              icon: isWin ? path.join(__dirname, 'icon.ico') : path.join(__dirname, 'icon64.png'),
              webPreferences: {
                nodeIntegration: false,
                nodeIntegrationInWorker: false,
                contextIsolation: false,
                sandbox: false,
                experimentalFeatures: true,
                webviewTag: true,
                devTools: true,
                preload: path.join(__dirname, 'client-preload.js')
              }
            });
            require('@electron/remote/main').enable(aboutWindow.webContents);
            aboutWindow.loadFile('./ui/about.html');
            electronLog.info('Opened about.html');
          }
        }
      ]
    }
  ]);
};
