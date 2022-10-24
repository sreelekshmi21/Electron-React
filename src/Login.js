import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom'

export default function Login() {

    const [formValues, setFormValues] = useState({
      email: '',
      password: ''
    })

    const [errors, setErrors] = useState('')

    const navigate = useNavigate()

    const handleChange = (e) =>{
      setFormValues({
        ...formValues,
        [e.target.name]: e.target.value
      })
    }

    const validateEmail = (email) =>{
      var re = /\S+@\S+\.\S+/;
      return re.test(email);
    }

    const handleLogin = () =>{
      let select = document.getElementById('service');
      let value = select.options[select.selectedIndex].value;
      const serviceProvider  = value
      if (!formValues?.email || !formValues?.password || !serviceProvider) {
        setErrors("input fields cannot be empty");
      } 
      else{
        if(validateEmail(formValues?.email)){
          setErrors('')
        const userInfo = {
          email: formValues?.email,
          password: formValues?.password,
          service: serviceProvider 
        }
        console.log('#LOGIN handleLogin',userInfo)
        navigate('/inbox',{ state: userInfo })
        // window.api.sendLogin(userInfo)
        }
        else setErrors("Email is not properly structured");
      }
     
    //    navigate('/home.js',userName)
    }

  return (
//     <div class="container">
//          <input
//                 type='text'
//                 name='email'
//                 placeholder='Your EMAIL ID'
//                 value={formValues?.email}
//                 onChange={handleChange}
//               />

// <input
//                 type='text'
//                 name='password'
//                 placeholder='Your PASSWORD'
//                 value={formValues?.password}
//                 onChange={handleChange}
//               />

// <label for="service">Choose SERVER:</label>

// <select name="service" id="service">
//     <option value="">--Please choose SERVICE PROVIDER--</option>
//     <option value="fsc1.net.8090">fsc1.net.8090</option>
//     <option value="fsc1.net.8045">fsc1.net.8045</option>
//     <option value="fsc1.net.8000">fsc1.net.8000</option>
// </select><br />
// <br />
// <br />
//                  <button
//                  class="login-btn"
//                 type='button'
//                 onClick={handleLogin}
                
//                 >LOGIN</button>
//             <br />
//             <br />
//             <h5>{errors && errors}</h5>
//     </div>
<div className="main">
<div className="sub-main">
  <div>
    <div className="imgs">
      <div className="container-image">
        {/* <img src="" alt="profile" className=""/> */}
         <h2>TAO</h2>
      </div>


    </div>
    <div>
     
      <div>
        
        <input type="text" name='email'
                className='formField name'
                placeholder='EMAIL ID'
                value={formValues?.email}
                onChange={handleChange} />
      </div>
      <div className="second-input">
       <input
                type='text'
                name='password'
                placeholder='PASSWORD'
                value={formValues?.password}
                onChange={handleChange}
                className="formField name"
              />
      </div>
      <div className="second-input">
       <select name="service" id="service" className='name'>
    <option value="">--Please choose SERVER--</option>
     <option value="fsc1.net.8090">fsc1.net.8090</option>
     <option value="fsc1.net.8045">fsc1.net.8045</option>
    <option value="fsc1.net.8000">fsc1.net.8000</option>
</select>
      </div>
      <div className='flex-container'>
        <div className='flex-left'>
          <input type="checkbox" />
          Offline</div>
        <div className='flex-right'>Change Password</div>
      </div>
      
             <h5>{errors && errors}</h5>
     <div className="login-button">
     <button type='button' className="login-button" onClick={handleLogin}>Login</button>
     </div>
      
       <p className="link">
         <a href="#">Advanced Security</a>|<a href="#">Help</a>
       </p>
      

    </div>
  </div>
  

</div>
</div>
  )
}
