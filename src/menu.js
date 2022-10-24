const { app, Menu} = require('electron')

const isMac  = process.platform === 'darwin'

const template = [
  
    {
      label:  'File',             //app.name,
      submenu: [
        {
          // click: () => mainWindow.webContents.send('new-mail','HELLO'),
          // click: () => { onOpenClicked(); } //user-defined function
          label: 'New Mail'
        }
        ]
    },
    {
      label: 'Edit',
      submenu: [
         {
            role: 'undo'
         },
         {
            role: 'redo'
         },
         {
            type: 'separator'
         },
         {
            role: 'cut'
         },
         {
            role: 'copy'
         },
         {
            role: 'paste'
         }
      ]
   },
   {
    label:  'View',             //app.name,
   
  },{
    label:  'List',             //app.name,
   
  },{
    label:  'Tools',             //app.name,
   
  },{
    label:  'Compose',             //app.name,
   
  },{
    label:  'Windows',             //app.name,
   
  },{
    label:'Exit',
    click(){
        app.quit()
    }
  },
  {
    label:  'Help',             //app.name,
   
  },
  
  ]
  
  module.exports.mainMenu = Menu.buildFromTemplate(template)


  