const { contextBridge, ipcRenderer, remote } = require('electron')
// window.ipcRenderer = require('electron').ipcRenderer

contextBridge.exposeInMainWorld('api', {
  
    // send: (channel,data) => {
    //     let validChannels = ["toMain"];
    //     if (validChannels.includes(channel)) {
    //         ipcRenderer.send(channel, data);
    //     }
    // }
    notificationApi: {
        sendNotification(message) {
          console.log('#HOME preload',message)
          ipcRenderer.send('notify', message);
        }
      },

    addData: (data) =>{
      console.log('#HOME add prod',data)
      ipcRenderer.send('add-data', data);
    },

    setTitle: (title) => ipcRenderer.send('set-title',title),
   
    onReceiveData: (callback) => ipcRenderer.on('receive-data',callback),

    GetVersion: (msg) => ipcRenderer.invoke('get/version',msg),
   

    sendPromise: (msg) => ipcRenderer.invoke('promise-msg',msg),
    

    // onUpdateCounter: (callback) => ipcRenderer.on('onUpdateCounter',(callback)),
    // onNewMail: (callback) => ipcRenderer.on('onUpdateCounter',(callback)),
    // sendLogin: (userData) => ipcRenderer.send('logged-in',userData)
      
    sendLogin: async (userData) =>{
      let result = await ipcRenderer.invoke('logged-in',userData)
      console.log('#PRELOAD invoke RESULT',result)
    },

    onNewMail: (msg) => ipcRenderer.send('new-mail',msg)
    
    
    

    
});



// window.ipcRenderer = require('electron').ipcRenderer;