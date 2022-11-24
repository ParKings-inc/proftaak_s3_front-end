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
import { AddCar, DoesLicenseExist, licenseValidation } from '../services/CarService'
import { getAllCars } from '../services/CarService'
import { getCarByUserId } from '../services/CarService'
import { DeleteCar } from '../services/CarService'
import '../style/AddCarPage.css'
import {KentekenCheck} from '../components/LicenseValidation/kenteken-check-nl-class.js'
import { useValidation } from '@mui/x-date-pickers/internals/hooks/validation/useValidation';
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
      licenseValidation();
    }, [])

    var validation = new Boolean;

    function licenseValidation(){
      const outputElm = document.getElementById('license');
      const inputElm = document.getElementById('license');

      const kt = new KentekenCheck(document.getElementById('license').value, inputElm, outputElm, true);
      console.log("License validation")
      kt.formatLicense();
      kt.bindInputListener();

      validation = kt.valid;
      console.log("Kentekencheck output: ", kt.valid)
    }
    
    function OnSubmit(){
        let LicensePlate = document.getElementById('license').value;
        licenseValidation();
        if(validation){
          document.getElementById('ValidationMessage').innerHTML = 'License is valid'
          document.getElementById('ValidationMessage').style.color = 'green'
          let data = {
              userID: user.sub,
              kenteken: LicensePlate
            }
          console.log(data)
          console.log(user)
          DoesLicenseExist(LicensePlate);
          console.log("DoesLicenseExist: ", typeof licenseValidation);
          if(licenseValidation){
            document.getElementById('ValidationMessage').innerHTML = 'License already exists';
            document.getElementById('ValidationMessage').style.color = 'red'
         }
          AddCar(data)
        } else if(!validation){
            document.getElementById('ValidationMessage').innerHTML = 'License is invalid'
            document.getElementById('ValidationMessage').style.color = 'red'
        }
    }


  return (

    <div className='w-100'>
    <div>
    <h5 className='mt-25 center'>Manage cars</h5>
    <p className='table-container'>
    <input type="text" className='text-input' id='license'></input>
    <button className='add-button' onClick={OnSubmit}>new license</button>
    </p>
    <p id='ValidationMessage' className='center'></p>
    <h6 className='center mb-10 mt-10'>Your cars:</h6></div>
    <div>{cars.map((c) => <p className='table-container' key={c.id}>
      <b className='list-item'>{c.kenteken}</b>
      <button className='delete-button' onClick={() => {DeleteCar(c.id)}}>delete</button>
      </p>)}</div>
    </div>
    
  )
}

export default AddCarPage