import React, { useState, useMemo, useEffect }  from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './Styles/App.css';
import { userContext } from './contexct/context';
import Main from './pages/Main';
import Login from './pages/Login';

function App() {

  useEffect(() => {
    getMe();
  }, []);
 
 
 const [token, setToken] = useState(null);
 const [chechToken, setCheckToken] = useState(false);

 const value = useMemo(() => ({ token, setToken }), [token, setToken]);

 const getMe = async () => {
   let response = await fetch("http://localhost:8001/api" + "/admin/config", {
     method: 'GET',
     headers: {
       accept: 'application/json',
       'Content-Type': 'application/json',
       authorization: localStorage.getItem('token'),
     },
   });
   let data = await response.json();
   if (response.status === 200) {
     setToken(localStorage.getItem('token'));
     setCheckToken(true);
   } else {
   }
 };

 

return (
  <>
   <userContext.Provider value={value}>
        <Router>
          <Routes>
            {chechToken === true ?(
              <>
              <Route exact path='/' element={<Main />} />
              </>
            ):
            (
              <>
              <Route exact path='/' element={<Login />} />
              </>
            )}
          </Routes>
        </Router>
      </userContext.Provider>
  </>
);
}

export default App;
