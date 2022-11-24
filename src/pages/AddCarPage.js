import React, { useContext, useEffect } from 'react'
import {
  TextField,
  FormControl,
  Button,
  Select,
  MenuItem,
  InputLabel,
} from "@mui/material";
import { userContext } from '../userContext'
import { useState } from 'react'
import { Input } from '@mui/material'
import { AddCar } from '../services/CarService'
import { getAllCars } from '../services/CarService'
import { getCarByUserId } from '../services/CarService'
import { DeleteCar } from '../services/CarService'
import '../style/AddCarPage.css'
import {KentekenCheck} from '../components/LicenseValidation/kenteken-check-nl-class.js'
//import {KentekenCheck} from 'rdw-kenteken-check'



const AddCarPage = () => {
    const [cars, setCars] = useState([])
    const {user} = useContext(userContext)

    useEffect(() => {
    
      console.log(user)
      async function AssignCars(){
        setCars(await getCarByUserId(user.sub))
      }
      AssignCars()
    }, [])


    function licenseValidation(){
      const outputElm = document.getElementById('kenteken-inline');
      const inputElm = document.getElementById('license');

      const kt = new KentekenCheck(document.getElementById('license').value, inputElm, outputElm, true);
      console.log("License validation")
      //kt.formatLicense();
      kt.formatLicense();
      kt.bindInputListener();
      console.log("Kentekencheck output: ", kt.valid)

      // format only
      const kt2 = new KentekenCheck('JFK01P')
      outputElm.innerHTML = kt2.formatLicense();
    }
    
    function OnSubmit(){
        let LicensePlate = document.getElementById('license').value;
        licenseValidation();
        /*let data = {
            userID: user.sub,
            kenteken: LicensePlate
          }
        console.log(data)
        console.log(user)
        AddCar(data)*/
    }


  return (

    <div className='w-100'>
    <div>
    <h5 className='mt-25 center'>Manage cars</h5>
    <p className='table-container'>
    <input type="text" className='text-input' id='license'></input>
    <button className='add-button' onClick={OnSubmit}>new license</button>
    </p>
    <h6 className='center mb-10 mt-10'>Your cars:</h6></div>
    <div>{cars.map((c) => <p className='table-container' key={c.id}>
      <b className='list-item'>{c.kenteken}</b>
      <button className='delete-button' onClick={() => {DeleteCar(c.id)}}>delete</button>
      </p>)}</div>
      
<div class="form-control">
    <label for="kenteken-inline">html5 validation</label>
    <input id="kenteken-inline"
           class="html5-input"
           type="text"
           maxlength="6"
           autocomplete="off"
           pattern="^([bdfghjklmnprstvwxyzBDFGHJKLMNPRSTVWXYZ]{2})([0-9]{2})([0-9]{2})|([0-9]{2})([0-9]{2})([bdfghjklmnprstvwxyzBDFGHJKLMNPRSTVWXYZ]{2})|([0-9]{2})([bdfghjklmnprstvwxyzBDFGHJKLMNPRSTVWXYZ]{2})([0-9]{2})|([bdfghjklmnprstvwxyzBDFGHJKLMNPRSTVWXYZ]{2})([0-9]{2})([bdfghjklmnprstvwxyzBDFGHJKLMNPRSTVWXYZ]{2})|([bdfghjklmnprstvwxyzBDFGHJKLMNPRSTVWXYZ]{2})([bdfghjklmnprstvwxyzBDFGHJKLMNPRSTVWXYZ]{2})([0-9]{2})|([0-9]{2})([bdfghjklmnprstvwxyzBDFGHJKLMNPRSTVWXYZ]{2})([bdfghjklmnprstvwxyzBDFGHJKLMNPRSTVWXYZ]{2})|([0-9]{2})([bdfghjklmnprstvwxyzBDFGHJKLMNPRSTVWXYZ]{3})([0-9]{1})|([0-9]{1})([bdfghjklmnprstvwxyzBDFGHJKLMNPRSTVWXYZ]{3})([0-9]{2})|([bdfghjklmnprstvwxyzBDFGHJKLMNPRSTVWXYZ]{2})([0-9]{3})([bdfghjklmnprstvwxyzBDFGHJKLMNPRSTVWXYZ]{1})|([bdfghjklmnprstvwxyzBDFGHJKLMNPRSTVWXYZ]{1})([0-9]{3})([bdfghjklmnprstvwxyzBDFGHJKLMNPRSTVWXYZ]{2})|([bdfghjklmnprstvwxyzBDFGHJKLMNPRSTVWXYZ]{3})([0-9]{2})([bdfghjklmnprstvwxyzBDFGHJKLMNPRSTVWXYZ]{1})$"
           required/>
    <span class="valid-message"></span>
</div>
    </div>
    
  )
}

export default AddCarPage