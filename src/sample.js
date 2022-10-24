// <!DOCTYPE html>
// <html>
//   <head>
//     <meta charset="UTF-8">
//     <!-- https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP -->
//     <!-- <meta http-equiv="Content-Security-Policy" content="default-src 'self'; script-src 'self'">
//     <title>Hello World!</title> -->
//     <meta name="viewport" content="width=device-width, initial-scale=1.0">
//     <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.5.3/dist/css/bootstrap.min.css" integrity="sha384-TX8t27EcRE3e/ihU7zmQxVncDAy5uIKz4rEkgIXeMed4M0jlfIDPvg6uqKI2xXr2" crossorigin="anonymous">
//     <title>Hello World!</title>
//   </head>
//   <body>
//     <h1>Hello World!</h1>
//     We are using Node.js <span id="node-version"></span>,
//     Chromium <span id="chrome-version"></span>,
//     and Electron <span id="electron-version"></span>.
//     <p>After launching this application, you should see the system notification.</p>
//     <p id="output">Click it to see the effect in this interface.</p>

//     <button id="send">Send event to main</button>

//     Title: <input id="title"/>
//     Current value: <strong id="counter">0</strong>
//     <button id="btn" type="button">Set</button>
//     <div class="container">
//       <div class="row">
//           <div class="col-md-6">
//               <ul id="list" class="list-group">
//                  <li class="list-group-item">Buy Groceries</li>
//                  <li class="list-group-item">Cook Meal</li>
//               </ul>
//           </div>

//           <div class="col-md-6">
//           </div>

//           <div class="col-md-6">
//             <input class="form-control" id="newTask" placeholder="Enter New Task" />
//             <br />
//             <button type="button" class="btn btn-primary" id="addTask">
//                 Add Task
//             </button>
//         </div>
//       </div>
//    </div>
//     <script src="./renderer.js"></script>
//   </body>
// </html>

// // Modules to control application life and create native browser window
// const { app, BrowserWindow, ipcMain, Menu, Notification } = require('electron')
// const path = require('path')

// const createWindow = () => {
//   // Create the browser window.
// //   ipcMain.handle('toMain', async function toMain(_event, data) {
// //     console.log('data', data);
// // })
//   const preloadScriptPath = path.join(__dirname, 'preload.js');

//   const mainWindow = new BrowserWindow({
//     width: 800,
//     height: 600,
//     webPreferences: {
//       preload: path.join(__dirname, 'preload.js')
//     }
//     // webPreferences: {
//     //        contextIsolation: true, 
//     //        preload: preloadScriptPath,
//     // }
//   })

//   // mainWindow.webContents.send('MSG-FROM-MAIN', 'HELLO RENDERER')

//   const menu = Menu.buildFromTemplate([
//     {
//       label:  'Counter Menu',             //app.name,
//       submenu: [
//       {
//         click: () => mainWindow.webContents.send('update-counter', 1),
//         label: 'Increment',
//       },
//       {
//         click: () => mainWindow.webContents.send('update-counter', -1),
//         label: 'Decrement',
//       }
//       ]
//     },
//     {
//       label: 'Edit',
//       submenu: [
//          {
//             role: 'undo'
//          },
//          {
//             role: 'redo'
//          },
//          {
//             type: 'separator'
//          },
//          {
//             role: 'cut'
//          },
//          {
//             role: 'copy'
//          },
//          {
//             role: 'paste'
//          }
//       ]
//    }

//   ])

//   Menu.setApplicationMenu(menu)


//   ipcMain.on('set-title', (event, title) =>{
//     const webContents = event.sender
//     const win = BrowserWindow.fromWebContents(webContents)
//     win.setTitle(title)
//   })

//   ipcMain.handle('showNotif', (event, ...args) => {
//     const notification = {
//         title: 'New Task',
//         body: `Added: ${args[0]}`
//     }

//     new Notification(notification).show()
// });

//   // ipcMain.handle('toMain', async function toMain(_event, data) {
//   //      console.log('data', data);
//   // })

//   // and load the index.html of the app.
//   mainWindow.loadFile('index.html')

//   // Open the DevTools.
//   mainWindow.webContents.openDevTools()


//   // ipcMain.handle('toMain', async function toMain(_event, data) {
//   //      console.log('data', data);
//   // })

// }
// function handleSetTitle (event, title) {
//   const webContents = event.sender
//   const win = BrowserWindow.fromWebContents(webContents)
//   win.setTitle(title)
// }
// // const NOTIFICATION_TITLE = 'Basic Notification'
// // const NOTIFICATION_BODY = 'Notification from the Main process'
// // This method will be called when Electron has finished
// // initialization and is ready to create browser windows.
// // Some APIs can only be used after this event occurs.

// // function showNotification () {
// //     new Notification({ title: NOTIFICATION_TITLE, body: NOTIFICATION_BODY }).show()
// // }


// app.whenReady().then(() => {
//   ipcMain.handle('toMain', async function toMain(_event, data) {
//     console.log('data', data);
// })

// ipcMain.on('counter-value', (_event, value) => {
//   console.log(value) // will print value to Node console
// })

//   createWindow()

//   app.on('activate', () => {
//     // On macOS it's common to re-create a window in the app when the
//     // dock icon is clicked and there are no other windows open.
//     if (BrowserWindow.getAllWindows().length === 0) createWindow()
//   })
// })

// // Quit when all windows are closed, except on macOS. There, it's common
// // for applications and their menu bar to stay active until the user quits
// // explicitly with Cmd + Q.
// app.on('window-all-closed', () => {
//   if (process.platform !== 'darwin') app.quit()
// })

// // In this file you can include the rest of your app's specific main process
// // code. You can also put them in separate files and require them here.





// // All the Node.js APIs are available in the preload process.
// // It has the same sandbox as a Chrome extension.
// // window.addEventListener('DOMContentLoaded', () => {
// //     const replaceText = (selector, text) => {
// //       const element = document.getElementById(selector)
// //       if (element) element.innerText = text
// //     }
  
// //     for (const dependency of ['chrome', 'node', 'electron']) {
// //       replaceText(`${dependency}-version`, process.versions[dependency])
// //     }
// //   })

// const { contextBridge, ipcRenderer } = require('electron')

// contextBridge.exposeInMainWorld('electronAPI', {
//   toMain: (args) => {
//     ipcRenderer.invoke('toMain', args)
//   },
//   setTitle: (title) => ipcRenderer.send('set-title', title),

//   onUpdateCounter: (callback) => ipcRenderer.on('update-counter', callback),

//   showNotif: (args) => {
//     ipcRenderer.invoke('showNotif', args)
//   },
// });


// // contextBridge.exposeInMainWorld('electronAPI', {
// //   toMain: (args) => {
// //     ipcRenderer.invoke('toMain', args)
// //   }
  
// // });










// const NOTIFICATION_TITLE = 'Title'
// const NOTIFICATION_BODY = 'Notification from the Renderer process. Click to log to console.'
// const CLICK_MESSAGE = 'Notification clicked!'

// new Notification(NOTIFICATION_TITLE, { body: NOTIFICATION_BODY })
//   .onclick = () => document.getElementById("output").innerText = CLICK_MESSAGE


//   function sayHi() {
//     window.electronAPI.toMain('Hi from the renderer process!')
//   }
  
//   const button = document.getElementById('send');  
//   button.addEventListener('click', sayHi);

//   const setButton = document.getElementById('btn')
// const titleInput = document.getElementById('title')
// setButton.addEventListener('click', () => {
//     const title = titleInput.value
//     window.electronAPI.setTitle(title)
// });
  

// const counter = document.getElementById('counter')

// window.electronAPI.onUpdateCounter((event, value) => {
//     const oldValue = Number(counter.innerText)
//     const newValue = oldValue + value
//     counter.innerText = newValue
//     event.sender.send('counter-value', newValue)
// })

// let list = document.getElementById("list");
// let newTask = document.getElementById("newTask");

// document.getElementById("addTask").addEventListener('click', () => {
//     list.insertAdjacentHTML('beforeend', `<li class="list-group-item">${newTask.value}</li>`)
//     window.electronAPI.showNotif(newTask.value)
//     newTask.value = '';
// });