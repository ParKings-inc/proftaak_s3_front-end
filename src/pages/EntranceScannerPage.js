import React from 'react'
import { useState } from 'react'
import { Input } from '@mui/material'
import { KentekenExists } from '../services/ScannerService'

const EntranceScannerPage = () => {
    const [user, setUser] = useState(null)
    let kentekenExists = "false";

    function OnSubmit(){
        let LicensePlate = document.getElementById('license').value
        let data = {
            kenteken: LicensePlate
          }
        KentekenExists(data)
    }

  return (
    <>
    <h2>Scan license plate to enter</h2>
    <input type="text" id='license'></input>
    <button onClick={OnSubmit}>submit</button>
    </>
    
  )
}

export default EntranceScannerPage