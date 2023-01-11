import ReceiptDetails from "../../../../components/Receipts/Details/ReceiptDetails";
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import "../../../../style/ReservationsPage.css";
import { Link } from 'react-router-dom';
import { Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
//retrieve the reservation

const ReceiptDetailsPage = (props) => {
    const navigate = useNavigate();
    function Back() {
        navigate("/Receipt")
    }
    return (
        <div className='center mt-25'>

            <div className='flex row mb-25'>
                {/* Change Icon */}
                <div className='w-auto bg-primary px-1 rounded flex centered'>
                    {/* <h5 className='m-0 text-white'>X</h5> */}
                    <KeyboardArrowLeftIcon onClick={Back} className='scale-2 white' />
                </div>
                {/* Align text vertically */}
                <div className='w-auto flex flex-col items-center'>
                    <Typography variant='h5'>View your Receipt</Typography>
                </div>
            </div>
            <ReceiptDetails></ReceiptDetails>
        </div>

    )
}

export default ReceiptDetailsPage