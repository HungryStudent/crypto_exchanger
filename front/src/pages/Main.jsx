import React, { useState, useMemo, useEffect } from "react";
import '../Styles/App.css';



const Main = () => {

  useEffect(() => {
    getValueSettings();
    fetchGetCurruency();
    fetchGetPair();
  }, []);

  const modal = () => {
    return (
      <>
      <div className="modal">
        <button className="App__closeModalBtn" onClick={CloseModal}>X</button>
        <label className="ForInpM">Название:<input type="text" className="ForInpMargin" name="name" defaultValue={getDataById.name} onChange={(e) =>SetDataForEdit(e)}/></label>
        <label className="ForInpM">Минимум:<input type="text" className="ForInpMargin" name="min" defaultValue={getDataById.min} onChange={(e) =>SetDataForEdit(e)}/></label>
        <label className="ForInpM">Объём:<input type="text" className="ForInpMargin" name="volume" defaultValue={getDataById.volume} onChange={(e) =>SetDataForEdit(e)}/></label>
        <div className="container">
          <button className="App__confirmBtnEdit" onClick={()=>(EditByIdCurrency(),CloseModal())}>Изменить</button>
        </div>
      </div>
      </>
    )
  }
   const modal1 = () => {
    return (
      <>
      <div className="modal1">
        <button className="App__closeModalBtn" onClick={CloseModal1}>X</button>
        <label className="ForInp">Первая валюта:<select className="App__Select" name="currency_one_id" onChange={(e) => EditPairsId(e)}>
                {getData.map((item, index) => {
                  return (
                    <>
                    {item.name === postData2.name1 ? (
                      <option value={item.id} selected>{item.name}</option>
                    ):(
                      <option value={item.id}>{item.name}</option>
                    )}
                    </>
                  )
                })}
              </select></label>
        <label className="ForInp">Вторая валюта:<select className="App__Select" name="currency_two_id" onChange={(e) => EditPairsId(e)}>
        {getData.map((item, index) => {
              return (
                <>
                {item.name === postData2.name2 ? (
                  <option value={item.id} selected>{item.name}</option>
                ):(
                  <option value={item.id}>{item.name}</option>
                )}
                </>
              )
            })}
        </select></label>
        <label className="ForInpM">Отклонение:<input type="text" className="ForInpMargin" name="marginality" defaultValue={getDataById1.marginality} onChange={(e) => EditPairsId(e)}/></label>
        <div className="container">
          <button className="App__confirmBtnEdit" onClick={()=>(EditByIdPair(),CloseModal1())}>Изменить</button>
        </div>
      </div>
      </>
    )
  }
  const [checkModal, setCheckModal] = useState(true);
  const [checkModal1, setCheckModal1] = useState(true);
  const CloseModal = () =>{
    setCheckModal(false);
  }
  const OpenModal = () =>{
    setCheckModal(true);
  }
  const CloseModal1 = () =>{
    setCheckModal1(false);
  }
  const OpenModal1 = () =>{
    setCheckModal1(true);
  }
  const [addBtn1, setAddBtn1] = useState(false);
  const [addBtn2, setAddBtn2] = useState(false);
  let [modelId, setModelId] = useState();
  let [modelIdPair, setModelIdPair] = useState();
  let [postData, setPostData] = useState({});
  let [postData1, setPostData1] = useState({
  });
  let [postData2, setPostData2] = useState({
  });
  let [patchById, setPatchById] = useState({});
  let [getData, setGetData] = useState([]);
  let [getDataById, setGetDataById] = useState({});
  let [getData1, setGetData1] = useState([]);
  let [getDataById1, setGetDataById1] = useState({});



  let [FirstInput, setFirstInput] = useState({
    key: "support_url",
  });
  let [SecondInput, setSecondInput] = useState({
    key: "bot_token",
  });
  const [valueSet, setValueSet] = useState([])

  const FirstIn = (e) => {
    let value = e.target.value;
    let name = e.target.name;
    setFirstInput({ ...FirstInput, [name]: value, });
  }

  const DelByIdCurency = (e) => {
    let id = parseInt(e.target.value);
    fetchDeleteCurruency(id);
    fetchGetCurruency();
  }

  const DelByIdPair = (e) => {
    let id = parseInt(e.target.value);
    fetchDeletePair(id);
    fetchGetPair();
  }

  const EditByIdCurrency = () => {
    let id = modelId;
    fetchEditCurrency(id);
    fetchGetCurruency();
    fetchGetPair();
  }

  const EditByIdPair = () => {
    let id = modelIdPair;
    fetchEditPair(id);
    fetchGetPair();
  }

  const SetDataForEdit = (e) => {
    let value = e.target.value;
    let name = e.target.name;
    setPatchById({...patchById, [name]: value,});
  }

  const GetById = (e) => {
    let id = parseInt(e.target.value);
    fetchGetCurruencyById(id);
  }

  const GetByPairId = (e) => {
    let id = parseInt(e.target.value);
    fetchGetPairByid(id);
  }

  const SecondIn = (e) => {
    let value = e.target.value;
    let name = e.target.name;
    setSecondInput({ ...SecondInput, [name]: value, });
  }

  const PostCurruensis = (e) => {
    let value = e.target.value;
    let name = e.target.name;
    setPostData({ ...postData, [name]: value, });
  }


  const PostPairs = (e) => {
    let value = parseFloat(e.target.value);
    let name = e.target.name;
    setPostData1({ ...postData1, [name]: value, });
  }

  const EditPairsId = (e) => {
    let value = parseFloat(e.target.value);
    let name = e.target.name;
    setPostData2({ ...postData2, [name]: value, });
  }

  const delay = ms => new Promise(
    resolve => setTimeout(resolve, ms)
  );

  const RenderTable1 = () => {
    return (
      <>
        <h1 className="App__title">Валюты</h1>
        <div className="App__FirstTable">
          <div className="container2">
            <button className="App__Tablebtn" onClick={CheckAdd1}>+</button>
          </div>
          <table className="App__tableById">

            <thead>
              <tr>
                <th>
                  Название
                </th>
                <th>
                  Мин
                </th>
                <th>
                  Объём
                </th>
                <th>
                  Удалить/Редактировать
                </th>
              </tr>
            </thead>
            <tbody>
              {getData.map((item, index) => {
                return (
                  <tr className="ForDel__tr">
                    <td>
                      {item.name}
                    </td>
                    <td>
                      {item.min}
                    </td>
                    <td>
                      {item.volume}
                    </td>
                    <td >
                      <input className="ForDel" type="button" value={item.id} onClick={(e) => DelByIdCurency(e)} />
                      <input className="ForDel1" type="button" value={item.id} onClick={(e) => (setModelId(item.id),GetById(e),OpenModal())} />
                      {modelId === item.id &&  getDataById.id === item.id && checkModal===true? (
                        <>
                          {modal()}
                        </>
                      ) : ('')}

                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>

        </div>
      </>
    )
  }


  const RenderTable2 = () => {
    return (
      <>
        <h1 className="App__title">Пары</h1>
        <div className="App__FirstTable">
          {addBtn1 === true ? (
            <div className="container2">
              <button className="App__Tablebtnif" onClick={CheckAdd2}>+</button>
            </div>
          ) : (
            <div className="container2">
              <button className="App__Tablebtnelse" onClick={CheckAdd2}>+</button>
            </div>
          )}
          <table className="App__tableById">
            <thead>
              <tr>
                <th>
                  Название пары
                </th>
                <th>
                  Отклонение
                </th>
                <th>
                  Удалить/Редактировать
                </th>
              </tr>
            </thead>
            <tbody>
              {getData1.map((item,index) =>{
                return(
                  <tr className="ForDel__tr">
                  <td>
                    {item.currency_one.name}-{item.currency_two.name}
                  </td>
                  <td>
                    {item.marginality}
                  </td>
                  <td>
                    <input className="ForDel" type="button" value={item.id} onClick={(e) => DelByIdPair(e)} />
                    <input className="ForDel1" type="button" value={item.id} onClick={(e) => (setModelIdPair(item.id),GetByPairId(e),OpenModal1())} />
                    {modelIdPair === item.id && getDataById1.id === item.id && checkModal1===true?(
                      <>
                       {modal1()}
                      </>
                    ):(
                      ''
                    )}
                  </td>
                </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </>
    )
  }


  const CheckAdd1 = () => {
    setAddBtn1(!addBtn1);
  }

  const CheckAdd2 = () => {
    setAddBtn2(!addBtn2);
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
          { ...FirstInput },
          { ...SecondInput }]
      ),
    });

    let data = await response.json();

    if (response.status === 200) {
      
    }
    else {
      
    }
  }


  const fetchCurruency = async () => {
    let response = await fetch("http://localhost:8001/api" + '/currency', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: localStorage.getItem('token'),
      },
      body: JSON.stringify({
        ...postData,
      }),
    });

    let data = await response.json();

    if (response.status === 201) {
     
    }
    else {
      
    }
  }


  const fetchPairs = async () => {
    let response = await fetch("http://localhost:8001/api" + '/pair', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: localStorage.getItem('token'),
      },
      body: JSON.stringify({
        ...postData1,
      }),
    });

    let data = await response.json();

    if (response.status === 201) {
     
    }
    else {
      
    }
  }

  const fetchGetCurruency = async () => {
    await delay(500);
    let response = await fetch("http://localhost:8001/api" + '/currency/', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: localStorage.getItem('token'),
      },
    });


    let data = await response.json();

    if (response.status === 200) {
      setGetData(data);
      setPostData1({currency_one_id: data[0].id, currency_two_id: data[0].id })
    }
    else {
      
    }
  }

  const fetchGetCurruencyById = async (id) => {
    let response = await fetch("http://localhost:8001/api" + '/currency/'+ id, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: localStorage.getItem('token'),
      },
    });


    let data = await response.json();

    if (response.status === 200) {
      setGetDataById(data);
    }
    else {
      
    }
  }

  const fetchGetPair = async () => {
    await delay(500);
    let response = await fetch("http://localhost:8001/api" + '/pair/', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: localStorage.getItem('token'),
      },
    });


    let data = await response.json();

    if (response.status === 200) {
      setGetData1(data);
    }
    else {
     
    }
  }

  const fetchGetPairByid = async (id) => {
    let response = await fetch("http://localhost:8001/api" + '/pair/' + id, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: localStorage.getItem('token'),
      },
    });


    let data = await response.json();

    if (response.status === 200) {
      setGetDataById1(data);
      setPostData2({currency_one_id: data.currency_one.id, currency_two_id: data.currency_two.id, name1: data.currency_one.name, name2: data.currency_two.name})
    }
    else {
      
    }
  }


  const fetchDeleteCurruency = async (id) => {
    let response = await fetch("http://localhost:8001/api" + '/currency/' + id, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: localStorage.getItem('token'),
      },
    });

    let data = await response.json();

    if (response.status === 200) {
     
    }
    else {
     
    }
  }

  const fetchDeletePair = async (id) => {
    let response = await fetch("http://localhost:8001/api" + '/pair/' + id, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: localStorage.getItem('token'),
      },
    });

    let data = await response.json();

    if (response.status === 200) {
      
    }
    else {
   
    }
  }

   const fetchEditCurrency = async (id) => {
    let response = await fetch("http://localhost:8001/api" + '/currency/' + id, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: localStorage.getItem('token'),
      },
      body: JSON.stringify({
        name: patchById.name,
        min: patchById.min,
        volume: patchById.volume,
      }),
    });

    let data = await response.json();

    if (response.status === 200) {
    
    }
    else {
      
    }
  }

  const fetchEditPair = async (id) => {
    let response = await fetch("http://localhost:8001/api" + '/pair/' + id, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: localStorage.getItem('token'),
      },
      body: JSON.stringify({
        currency_one_id: postData2.currency_one_id,
        currency_two_id: postData2.currency_two_id,
        marginality: postData2.marginality,
      }),
    });

    let data = await response.json();

    if (response.status === 200) {
      
    }
    else {
    
    }
  }




  return (
    <>
      <div className="App">

        <h1 className="App__title">Настройки</h1>
        <div className="App__SomeInput">
          {valueSet.length !== 0 ? (
            <>
              <input className="App__Inputs" name="value" id="First" onChange={(e) => FirstIn(e)} defaultValue={valueSet[0].value}></input>
              <input className="App__Inputs" name="value" id="Second" onChange={(e) => SecondIn(e)} defaultValue={valueSet[1].value}></input>
              <input className="App__Inputs"></input>
            </>
          ) : ('')}

        </div>
        <div className="container">
          <button className="App__SaveBtn" onClick={fetchSettings}>Сохранить</button>
        </div>
        {RenderTable1()}
        {addBtn1 === true ? (
          <>
            <div className="App__Add1">
              <label className="ForInp">Название:<input className="App__Inputs" name="name" onChange={(e) => PostCurruensis(e)}></input></label>
              <label className="ForInp">Минимум:<input className="App__Inputs" name="min" onChange={(e) => PostCurruensis(e)}></input></label>
              <label className="ForInp">Объём:<input className="App__Inputs" name="volume" onChange={(e) => PostCurruensis(e)}></input></label>
              <div className="container">
                <button className="App__confirmBtn" onClick={() => (fetchCurruency(), fetchGetCurruency(), HideAdd1())}>Добавить</button>
              </div>
            </div>

          </>
        ) :
          (
            ''
          )}
        {RenderTable2()}
        {addBtn2 === true ? (
          <>
            <div className="App__Add1 ForMargin">
              <label className="ForInp">Первая валюта:<select className="App__Select" name="currency_one_id" onChange={(e) => PostPairs(e)}>
                {getData.map((item, index) => {
                  return (
                    <option value={item.id}>{item.name}</option>
                  )
                })}
              </select></label>
              <label className="ForInp">Вторая валюта:<select className="App__Select" name="currency_two_id" onChange={(e) => PostPairs(e)}>
                {getData.map((item, index) => {
                  return (
                    <option value={item.id}>{item.name}</option>
                  )
                })}
              </select></label>
              <label className="ForInp">Отклонение:<input className="App__Inputs" name="marginality" onChange={(e) => PostPairs(e)}></input></label>
              {addBtn1 === true ? (
                <div className="container">
                  <button className="App__confirmBtn2if" onClick={() => (fetchPairs(), fetchGetPair(), HideAdd2())}>Добавить</button>
                </div>
              ) :
                (
                  <div className="container">
                    <button className="App__confirmBtn2" onClick={() => (fetchPairs(), fetchGetPair(), HideAdd2())}>Добавить</button>
                  </div>
                )}
            </div>
          </>
        ) :
          (
            ''
          )}
      </div>
    </>
  )
}

export default Main;