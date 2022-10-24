import React, {useState, useEffect} from "react";
import { Link } from "react-router-dom";
// import '/public/preload'
const { ipcRenderer } = window
// const remote = electron.remote
// const {dialog} = remote
 
export default function Home(){
  let versionStr = 0;
  let cpu = 0;
  const [products, setProducts] = useState([{
    name: 'Book',
    price: 50,
    color: 'grey'
  },
  {
    name: 'Pencil',
    price: 10,
    color: 'yellow'
  }
])

const [product, setProduct] = useState('GS')
    // const handleClick = () =>{
    // //  dialog.showErrorBox('Error Box','Fatal Error')
    // // window.ipcRenderer.on('Fatal Err')

    // // window.ipcRenderer.on('asynchronous-reply', (event, arg) => {
    // //   console.log(arg); // prints "pong"
    // // });
    // window.api.send('toMain', 'ping');
    // }
    useEffect(() => {
      console.log('#HOME')
      
      // api.notificationApi.sendNotification("My custom message!");
      // window.api.send('toMain', 'ping');
      // ipcRenderer.on(channels.GET_DATA, (event, arg) => {
      //   setData(arg);
      
   
      // });
    }, [])

    window.api.onUpdateCounter((e,icount) =>{

      // count = cData

      let element = document.getElementById('countValue')

      element.innerHTML = `COUNT ${icount}`
    }) 
    
   const showResponse = () =>{
    window.api.onReceiveData((event, msg) => {
     
      event.sender.send('receive-data', msg)
  })
   }


   const getVersion = async () =>{
     versionStr = await window.api.GetVersion('VERSION')
     console.log('#HOME GetVersion versionStr',versionStr)
     document.getElementById('versionValue').innerHTML = `VERSION: ${versionStr}`
   }

   const getCPUUsage = async () =>{
    cpu = await window.api.sendPromise('HELLO')
    console.log('#HOME getCPUUsage dt',cpu)
    document.getElementById('cpuUsage').innerHTML = `CPU USAGE: ${cpu?.percentCPUUsage}`
  }

    return (
      <div>
        <h1>Home</h1>
        <h3 id="countValue"></h3>
        <h4 id="cpuUsage"></h4>

        <Link to="/login">Go to LOGIN</Link>
       {/* Title: <input id="title"/>
    Current value: <strong id="counter">0</strong> */}
    <button type="button" onClick={() => {
      window.api.setTitle('MY ELECTRON REACT APP')
      // ipcRenderer.send('ss','HIIIIII messages')
    }}>CLICK TO SET WINDOW TITLE</button>
    <button type="button" onClick={() => {
     window.api.notificationApi.sendNotification('my SSSSS message')
      // ipcRenderer.send('ss','HIIIIII messages')
    }}>Show Msg</button>
    {products && products?.map((prod) => (<div>
      <span>{prod?.name}</span>
      <span>{prod?.price}</span>
      <span>{prod?.color}</span>
    </div>))}
    <input
                type='text'
                name='product'
                placeholder='Your Product'
                value={product}
                onChange={(e) => setProduct(e.target.value)}
              />
    <button type="button" onClick={() => {
      console.log('#PROD',product)
     window.api.addData(product)

     showResponse()

     }}>Add product</button>

     <button type="button" onClick={getVersion}>Click to get version</button>

     <h3 id="versionValue"></h3>

     <button type="button" onClick={getCPUUsage}>Click to get CPU Usage</button>
      </div>


    );
  
}