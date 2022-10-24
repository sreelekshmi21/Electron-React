// Modules to control application life and create native browser window
const { app, BrowserWindow, ipcMain, Menu, Notification} = require('electron')
const { mainMenu} = require('./src/menu')
const path = require('path')
const isDev = require('electron-is-dev');
const fs = require('fs');
const url = require('url')
let mainWindow;

let icount = 0;

const createWindow = () => {
  // Create the browser window.
//   ipcMain.handle('toMain', async function toMain(_event, data) {
//     console.log('data', data);
// })
  const preloadScriptPath = path.join(__dirname, 'preload.js');

  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: false,
      // enableRemoteModule: true,
      // worldSafeExecuteJavacsript: true,
      // enableRemoteModule: true,
      contextIsolation: true,
      preload: path.join(__dirname, 'preload.js')
    },
    // frame: false
      // frame: false
    // webPreferences: {
    //        contextIsolation: true, 
    //        preload: preloadScriptPath,
    // }
  })

  

  // mainWindow.setMenu(null);
 

 

 

  // and load the index.html of the app.
  // mainWindow.loadFile('index.html')

  // Open the DevTools.
  // mainWindow.webContents.openDevTools()
//   mainWindow.loadURL(url.format({
//     pathname: path.join(__dirname, 'src/index.html'),
//     protocol: 'file:',
//     slashes: true,
//     // frame: false
// }))
  //////////////
  mainWindow.loadURL(
    isDev
      ? 'http://localhost:3000'
      : `file://${path.join(__dirname, '../build/index.html')}`
  );
  ////////////////////////
  // Open the DevTools.
  if (isDev) {
    mainWindow.webContents.openDevTools({ mode: 'detach' });
  }

  // ipcMain.handle('toMain', async function toMain(_event, data) {
  //      console.log('data', data);
  // })

  // ipcMain.on('toMain', (event, arg) => {
  //   console.log(arg); // prints "ping"
  //   // event.reply('asynchronous-reply', 'pong');
  // });

  const handleSetTitle = (event, title) =>{
      const webContents = event.sender
      const win = BrowserWindow.fromWebContents(webContents)
      win.setTitle(title)
  }

  ipcMain.on('set-title', handleSetTitle)

ipcMain.on('notify', (_, message) => {
  console.log('#HOME main',message)
  new Notification({title: 'Notification', body: message}).show();
})

ipcMain.on('add-data', (event, data) => {
  console.log('#HOME MAIN ADD PROD',data)
  // event.sender.send('receive-data', 'ADDED SUCCESS');
  // const webContents = event.sender
  // const win = BrowserWindow.fromWebContents(webContents)
  mainWindow.webContents.send('receive-data', 'ADDED SUCCESS')
  
})

ipcMain.handle('get/version', (event, args) => {
  console.log('#MAIN get/version',args)
  return '21.0.1';
  
})

let interval = setInterval(() =>{
  icount++
  mainWindow.webContents.send('onUpdateCounter',icount)
  if(icount == 20 ){
    clearInterval(interval);
    console.log('clear interval called')
  }
},1500)

ipcMain.handle('promise-msg', (event, args) => {
  console.log('#MAIN promise-msg CPU',args,process.getCPUUsage())
  
  return process.getCPUUsage()
  
})
//////////////////////////////
// ipcMain.on('logged-in', (event, data) => {
//   console.log('#MAIN logged-in',data)
//   let userStr = JSON.stringify(data)
//   fs.writeFileSync('userInfo.txt',userStr)
//   console.log('File created and data written');
// })/////////////////////////


ipcMain.handle('logged-in', (event, data) => {
  console.log('#MAIN handle logged-in',data)
  //check Auth
  return true
  // let userStr = JSON.stringify(data)
  // fs.writeFileSync('userInfo.txt',userStr)
  // console.log('File created and data written');
})

// const menu = Menu.buildFromTemplate([
//   {
//     label:  'File',             //app.name,
//     submenu: [
//       {
//         // click: () => mainWindow.webContents.send('new-mail','HELLO'),
//         label: 'New Mail'
//       }
//       ]
//   },
//   {
//     label: 'Edit',
//     submenu: [
//        {
//           role: 'undo'
//        },
//        {
//           role: 'redo'
//        },
//        {
//           type: 'separator'
//        },
//        {
//           role: 'cut'
//        },
//        {
//           role: 'copy'
//        },
//        {
//           role: 'paste'
//        }
//     ]
//  },
//  {
//   label:  'View',             //app.name,
 
// },{
//   label:  'List',             //app.name,
 
// },{
//   label:  'Tools',             //app.name,
 
// },{
//   label:  'Compose',             //app.name,
 
// },{
//   label:  'Windows',             //app.name,
 
// },{
//   label:'Exit',
//   click(){
//       app.quit()
//   }
// },
// {
//   label:  'Help',             //app.name,
 
// },

// ])

Menu.setApplicationMenu(mainMenu)
}


//Function to create child window of parent one
function createChildWindow() {
  childWindow = new BrowserWindow({
    width: 1000,
    height: 700,
    modal: true,
    show: false,
    parent: mainWindow, // Make sure to add parent window here
  
    // Make sure to add webPreferences with below configuration
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      enableRemoteModule: true,
    },
  });
  
  // Child window loads settings.html file
  childWindow.loadFile("src/settings.html");
  
  childWindow.once("ready-to-show", () => {
    childWindow.show();
  });
}

ipcMain.on("new-mail", (event, arg) => {
  console.log('#NEW MAIL',arg)
  createChildWindow();
})
// const NOTIFICATION_TITLE = 'Basic Notification'
// const NOTIFICATION_BODY = 'Notification from the Main process'
// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.

// function showNotification () {
//     new Notification({ title: NOTIFICATION_TITLE, body: NOTIFICATION_BODY }).show()
// }


app.whenReady().then(() => {
 

  createWindow()

  app.on('activate', () => {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.

