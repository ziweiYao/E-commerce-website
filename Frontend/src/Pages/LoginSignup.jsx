import React from 'react'
import './CSS/LoginSignup.css'

const LoginSignup = () => {
  const [state, setState] = React.useState('Login'); // 'login' 或 'signup'
  const [agree, setAgree] = React.useState(false);
  const [formData, setFormData] = React.useState({
    username: '',
    email: '',
    password: ''
  });
  const changeHandler = (e) => {//在输入框内容变化时调用
    setFormData({
      ...formData,
      [e.target.name]: e.target.value //input的name对应e.target.name，input的value对应e.target.value
    });
  }

  const checkboxHandler = (e) => {
    setAgree(e.target.checked);//checked 属性表示复选框是否被选中
  }

  const checkvalidemail = () => {
    const email = formData.email;
    const re = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;  
    return re.test(email);
  }

  const signup = async () => {
    console.log('signup function called', formData);
    let responseData;
    await fetch('http://localhost:4000/signup', {
      method: 'POST',
      headers: {
        Accept: 'application/form-data',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    }).then(response => response.json()).then(data => {
      responseData = data;
    });
    if (responseData.success) {
      localStorage.setItem('auth-token', responseData.token);
      window.location.replace('/');
    }
    else {
      alert(responseData.message || 'signup failed');
    }
    
  }

  const login = async () => {
    if (!checkvalidemail()) {
      alert('Please enter a valid email address');
      return;
    }
    if (!agree) {
      alert('Please agree to the terms of use & privacy policy');
      return;
    }

    let responseData;
    await fetch('http://localhost:4000/login', {
      method: 'POST',
      headers: {
        Accept: 'application/form-data',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    }).then(response => response.json()).then(data => {
      responseData = data;
    });
    if (responseData.success) {
      localStorage.setItem('auth-token', responseData.token);
      window.location.replace('/');
    }
    else {
      alert(responseData.message || 'login failed');
    }
    console.log('login function called',formData);
  }

  return (
    <div className='loginsignup'>
      <div className="loginsignup-container">
        <h1>{state}</h1>
        <div className="loginsignup-fields">
          {state === "Sign Up"? <input name ='username' value={formData.username} type="text" placeholder='Your Name' onChange={changeHandler} /> : <></>}
          <input name ='email' value={formData.email} placeholder='Email Address' onChange={changeHandler} />
          <input name ='password' value={formData.password} placeholder='Password' onChange={changeHandler}/>
        </div>
        <button onClick={()=> { state === "Login"? login():signup()}}>Continue</button>
        {state === "Sign Up" ?
         <p className="loginsignup-login">Already have an account? <span onClick={() => setState("Login")}>Login here</span></p> :
         <p className="loginsignup-login" >Create an account? <span onClick={() => setState("Sign Up")}>Click here</span></p>
        }
        <div className="loginsignup-agree">
          <input type="checkbox" name='' id='' onChange={checkboxHandler} />
          <p>By continuing, i agree to the terms of use & privacy policy.</p>
        </div>
      </div>
    </div>
  )
}

export default LoginSignup
