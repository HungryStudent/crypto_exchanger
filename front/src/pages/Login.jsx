import { userContext } from '../contexct/context';
import '../Styles/Login.css';
import React, { useState, useMemo, useEffect,useContext }  from "react";




const Login = () => {

  const [authData, setAuthData] = useState({});
  const [checkLog, setCheckLog] = useState(false);

  const authSetData = (e) => {
    e.preventDefault();
    setAuthData({ ...authData, [e.target.name]: e.target.value });
  };

  
  const postAuthLogin = async () => {
    let response = await fetch("http://localhost:8001/api" + '/admin/login', {
      method: 'POST',
      headers: {
        accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...authData,
      }),
    });
    let data = await response.json();
    if (response.status === 200) {
      window.location = '/'
      localStorage.setItem('token', data.token);
      setToken(data.token);

    } else {
      alert('Неверные данные');
    }
  };


  const { token, setToken } = useContext(userContext);

  return(
    <>
    <div className='Login'>
        <div className='Block'>
            <h1 className='Title'>Вход</h1>
            <div className='ForMargin'>
                <div class="form__group field">
                  <input type="input" class="form__field" placeholder="E-mail" name="email" id='name' onChange={(e) => authSetData(e)}/>
                  <label for="name" class="form__label">E-mail</label>
                </div>
                <div class="form__group field">
                  <input type="input" class="form__field" placeholder="Password" name="password" id="pass" onChange={(e) => authSetData(e)}/>
                  <label for="pass" class="form__label">Pass</label>
                </div>
            </div>
            <div className='CoolBtn'>
	            <a class="btn" onClick={()=>(postAuthLogin())}>Войти</a>
            </div>
        </div>
    </div>
    
    </>
  )
}

export default Login;