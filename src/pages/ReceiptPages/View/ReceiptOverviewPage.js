
import React, { useContext, useEffect, useState } from 'react'
import { getReceiptsByUser } from "../../../services/ReceiptService";
import ReceiptOverview from "../../../components/Receipts/View/ReceiptOverview";


import { userContext } from '../../../userContext';
import { useNavigate } from 'react-router-dom';

import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import "../../../style/ReservationsPage.css";
import { Typography } from '@mui/material';



const ReceiptOverviewPage = () => {
    const user = useContext(userContext);
    
    const [Receipts, setReceipts] = useState([])
    const navigate = useNavigate();
    useEffect(() => {
        async function AsignValue() {
            if (user != null) {
                setReceipts(await getReceiptsByUser(user.user.sub))
            }
        }
        AsignValue();
    }, [user])

    function Home() {
        navigate("/")
    }

    function goToHome(){
        navigate("/");
    }

    return (

        <div className='center mt-25'>
            <div className='flex row mb-25'>
                
                <div onClick={goToHome} className='w-auto bg-primary px-1 rounded flex centered'>
                    {/* <h5 className='m-0 text-white'>X</h5> */}
                    <KeyboardArrowLeftIcon onClick={Home} className='scale-2 white' />
                </div>
                {/* Align text vertically */}
                <div className='w-auto flex flex-col items-center'>
                    <Typography variant='h5'>My Receipts</Typography>
                </div>
            </div>
            <ReceiptOverview Receipts={Receipts}></ReceiptOverview>
        </div>
    )
}

export default ReceiptOverviewPage