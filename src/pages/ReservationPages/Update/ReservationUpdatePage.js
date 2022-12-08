import UpdateReservation from "../../../components/Reservations/Update/UpdateReservation";
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import "../../../style/ReservationsPage.css";
// import { Link } from 'react-router-dom';
import { Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
//retrieve the reservation
import { useLocation } from 'react-router-dom';

const ReservationUpdatePage = (props) => {
    const navigate = useNavigate();
    const location = useLocation();
    let reservation = location.state.reservation[0];
    function Back() {
        navigate("/Reservation/Details", { state: { reservation: [reservation] } })
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
                    <Typography variant='h5'>Edit your reservation</Typography>
                </div>
            </div>
            <UpdateReservation reservation={reservation}></UpdateReservation>
        </div>

    )
}

export default ReservationUpdatePage