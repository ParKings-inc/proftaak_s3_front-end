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
import { useNavigate } from 'react-router-dom';
import { AddCar, DoesLicenseExist, getCarByUserId, DeleteCar } from '../services/CarService'
import '../style/AddCarPage.css'
import {KentekenCheck} from '../components/LicenseValidation/kenteken-check-nl-class.js'
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import { Typography } from '@mui/material';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



const AddCarPage = () => {
    const [cars, setCars] = useState([])
    const {user} = useContext(userContext)
    const navigate = useNavigate();

    useEffect(() => {
    
      console.log(user)
      async function AssignCars(){
        setCars(await getCarByUserId(user.sub))
      }
      AssignCars()
      licenseValidation();
    }, [])    

    var validation = new Boolean();

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

    function refresh() {    
      setTimeout(function () {
          document.location.reload()
      }, 100);
  }
    
    function OnSubmit(){
        let LicensePlate = document.getElementById('license').value;
        licenseValidation();
        if(validation){          
          let data = {
              userID: user.sub,
              kenteken: LicensePlate
            }
          console.log(data)
          console.log(user)
          //console.log("DoesLicenseExist: ", );
          DoesLicenseExist(LicensePlate).then((response) => {
            console.log(response)
            if(response){
              ChangeMessage(-1);
           } else if(!response){
            AddCar(data)
            ChangeMessage(1);
            refresh();
           }
          })         
        } else if(!validation){
          ChangeMessage(0);
        }
        
    }

    function Delete(id){
      DeleteCar(id);
      refresh();
    }

    function ChangeMessage(typeMessage){
      switch(typeMessage) {
          case 0:          
          toasrMessage("error","License is invalid")
            break;
          case 1:          
          toasrMessage("Succes","License is Added")
            break;
          case -1:            
            toasrMessage("error","License plate already exists")
            break;
          default:
            console.log("There isn't a switch case for this", typeMessage)
        } 
    }

    function Reservationsview() {
        navigate("/reservations");
    }

    function toasrMessage(type, message) {
      if (type == "error") {
        toast.error(message, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored"
        })
      } else {
        toast.success(message, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored"
        })
      }
    }

  return (

    <div className='center mt-25'>

      <div className='flex row mb-25'>
        <div onClick={Reservationsview} className='w-auto bg-primary px-1 rounded flex centered'>
            {/* <h5 className='m-0 text-white'>X</h5> */}
            <KeyboardArrowLeftIcon onClick={Reservationsview} className='scale-2 white' />
        </div>
        {/* Align text vertically */}
        <div className='w-auto flex flex-col items-center'>
            <Typography variant='h5'>Manage cars</Typography>
        </div>
      </div>
      
      <div className='w-100'>{cars.map((c) => 
        <p className='table-container' key={c.id}>
          <b className='list-item'>{c.kenteken}</b>
          <button className='btn btn-danger ' onClick={() => {Delete(c.id)}}>delete</button>
        </p>)}
      </div>
      
      <div className='w-100 fixed-bottom'>
        <div className='center'>
            <Typography variant='h5'>Enter New License</Typography>
        </div>
        <p className='table-container'>
          <input type="text" className='text-input' id='license'></input>
          <button className='btn btn-success' onClick={OnSubmit}>new license</button>
        </p>
        <p id='ValidationMessage' className='center'></p>
      </div>

    </div>
    
  )
}

export default AddCarPage