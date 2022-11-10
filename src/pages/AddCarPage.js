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

    function OnSubmit(){
        let LicensePlate = document.getElementById('license').value
        let data = {
            userID: user.sub,
            kenteken: LicensePlate
          }
        console.log(data)
        console.log(user)
        AddCar(data)
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
    </div>
    
  )
}

export default AddCarPage