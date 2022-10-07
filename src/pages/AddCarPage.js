import React from 'react'
import { userContext } from '../userContext'
import { useState } from 'react'
import { Input } from '@mui/material'
import { AddCar } from '../services/CarService'

const AddCarPage = () => {
    const [user, setUser] = useState(null)
    
    function OnSubmit(){
        let LicensePlate = document.getElementById('license').value
        let data = {
            userID: 1,
            kenteken: LicensePlate
          }
        console.log(data)
        AddCar(data)
    }

  return (
    <>
    <userContext.Consumer>
        {(value) => setUser(value.user)}
    </userContext.Consumer>
    <>
    <h2>Add license plate</h2>
    <input type="text" id='license'></input>
    <button onClick={OnSubmit}>submit</button>
    </>
    </>
    
  )
}

export default AddCarPage