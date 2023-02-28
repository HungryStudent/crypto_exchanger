import React, { useState, useMemo, useEffect }  from "react";
import '../Styles/App.css';

const Main = () => {
    
  useEffect(() => {
    getValueSettings();
  }, []);

    const [addBtn1,setAddBtn1] = useState(false);
    const [addBtn2,setAddBtn2] = useState(false);
    let [FirstInput, setFirstInput] = useState({
      key: "support_url",
    });
    let [SecondInput, setSecondInput] = useState({
      key: "bot_token",
    });
    const[valueSet, setValueSet] = useState([])

    const FirstIn = (e) => {
      let value = e.target.value;
      let name = e.target.name;
      setFirstInput({ ...FirstInput, [name]: value, });
    }

    const SecondIn = (e) => {
      let value = e.target.value;
      let name = e.target.name;
      setSecondInput({ ...SecondInput, [name]: value, });
    }
   
    const CheckAdd1 = () => {
     setAddBtn1(true);
    }
   
    const CheckAdd2 = () => {
     setAddBtn2(true);
    }
   
    const HideAdd1 = () => {
     setAddBtn1(false);
    }
   
    const HideAdd2 = () => {
     setAddBtn2(false);
    }

    const getValueSettings = async () => {
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
        setValueSet(data);
      } else {
        alert("Пошел нахуй!");
      }
    };

    const fetchSettings = async () => {
      let response = await fetch("http://localhost:8001/api" + '/admin/config', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: localStorage.getItem('token'),
        },
        body: JSON.stringify(
          [
          {...FirstInput},
          {...SecondInput}]
        ),
      });
  
      let data = await response.json();
  
      if (response.status === 200) {
        alert("Успех");
      }
      else {
        alert('Ошибка');
      }
    }

    
    return(
        <>
        <div className="App">
    <h1 className="App__title">Настройки</h1>
    <div className="App__SomeInput">
      {valueSet.length !== 0 ? (
        <>
          <input className="App__Inputs" name="value" id="First" onChange={(e) => FirstIn(e)} placeholder={valueSet[0].value}></input>
          <input className="App__Inputs" name="value" id="Second" onChange={(e) => SecondIn(e)} placeholder={valueSet[1].value}></input>
          <input className="App__Inputs"></input>
        </>
      ) : ('')}
      
    </div>
    <button className="App__SaveBtn" onClick={fetchSettings}>Сохранить</button>
    <h1 className="App__title">Валюты</h1>
    <div className="App__FirstTable">
        <button className="App__Tablebtn" onClick={CheckAdd1}>+</button>
        <table className="App__tableById">
            <thead>
                <tr>
                  <th>
                    Название
                  </th>
                  <th>
                    Еще поля наверное
                  </th>
                  <th>
                    Объём
                  </th>
                </tr>
            </thead>
            <tbody>
                <tr>
                <td>
                  Rub
                </td>
                <td>
                 чет там 
                </td>
                <td>
                  10 
                </td>
                </tr>
            </tbody>
        </table>
    </div>
    {addBtn1 === true ?(
           <div className="App__Add1">
               <input className="App__Inputs"></input>
               <input className="App__Inputs"></input>
               <input className="App__Inputs"></input>
               <input className="App__Inputs"></input>
               <button className="App__confirmBtn" onClick={HideAdd1}>Добавить</button>
           </div>
        ):
        (
          ''
        )}
    <h1 className="App__title">Пары</h1>
      <div className="App__FirstTable">
        {addBtn1 === true ?(
           <button className="App__Tablebtnif" onClick={CheckAdd2}>+</button>
        ):(
          <button className="App__Tablebtnelse" onClick={CheckAdd2}>+</button>
        )}
          <table className="App__tableById">
              <thead>
                  <tr>
                    <th>
                      Название пары
                    </th>
                    <th>
                      Еще поля наверное
                    </th>
                    <th>
                      Отклонение
                    </th>
                  </tr>
              </thead>
              <tbody>
                  <tr>
                  <td>
                    Btc-Rub
                  </td>
                  <td>
                    чет там
                  </td>
                  <td>
                    0.9 
                  </td>
                  </tr>
              </tbody>
          </table>
      </div>
      {addBtn2 === true ?(
           <div className="App__Add1 ForMargin">
               <select className="App__Inputs"><option>Rub</option><option>Btc</option></select>
               <input className="App__Inputs"></input>
               <input className="App__Inputs"></input>
               <input className="App__Inputs"></input>
               {addBtn1 === true ?(
                  <button className="App__confirmBtn2if" onClick={HideAdd2}>Добавить</button>
               ):
               (
                <button className="App__confirmBtn2" onClick={HideAdd2}>Добавить</button>
               )}
           </div>
        ):
        (
          ''
        )}
  </div>
        </>
    )
}

export default Main;