import { TextField, FormControl, InputLabel, OutlinedInput, Button, Stepper, Step, StepLabel, Box, Typography } from '@mui/material';
import React, { useState } from 'react'
import ReactDOM from 'react-dom/client'
import CreateReservationFormStep1 from './CreateReservationForm/CreateReservationFormStep1';
import ShowAvailableSpaceReservationFormStep2 from './CreateReservationForm/ShowAvailableSpaceReservationFormStep2';

const steps = ['Choose date and time', 'Check available spaces', 'Confirm reservation'];

const CreateReservationForm = () => {
    // const [activeStep, setActiveStep] = React.useState(0);

    // const handleNext = () => {

    //     setActiveStep((prevActiveStep) => prevActiveStep + 1);

    // };

    // const handleBack = () => {
    //     setActiveStep((prevActiveStep) => prevActiveStep - 1);
    // };

    // function Content() {
    //     if (activeStep + 1 == 1) {
    //         return <CreateReservationFormStep1 />;
    //     }
    //     else if (activeStep + 1 == 2) {
    //         return <ShowAvailableSpaceReservationFormStep2 />;
    //     }
    //     return <CreateReservationFormStep1 />;
    // }

    return (
        // <div>
        <form className="m-2 row g-3 shadow p-3 mb-5 bg-white rounded">
            <CreateReservationFormStep1 />
        </form>
        /*  Could use stepper if you want. I decided to leave it out. but in case it's a "must" in the future I left the code in here because its nearly done. I commented it due to responsitivity/layout issues that I personally didn't prioritize to resolve
                <Box sx={{ width: '100%' }}>
                    <Stepper activeStep={activeStep}>
                        {steps.map((label, index) => {
                            const stepProps = {};
                            const labelProps = {};
                            return (
                                <Step key={label} {...stepProps}>
                                    <StepLabel {...labelProps}>{label}</StepLabel>
                                </Step>
                            );
                        })}
                    </Stepper>
                    {activeStep === steps.length ? (
                        <React.Fragment>
                            <Typography sx={{ mt: 2, mb: 1 }}>
                                All steps completed - you&apos;re finished
                            </Typography>
                            <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                                <Box sx={{ flex: '1 1 auto' }} />
                                <Button>Finish</Button>
                            </Box>
                        </React.Fragment>
                    ) : (
                        <React.Fragment>
                            <Typography sx={{ mt: 2, mb: 1 }}>
                                <Content />
                            </Typography>
                            <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                                <Button
                                    color="inherit"
                                    disabled={activeStep === 0}
                                    onClick={handleBack}
                                    sx={{ mr: 1 }}
                                >
                                    Back
                                </Button>
                                <Box sx={{ flex: '1 1 auto' }} />
                                <Button onClick={handleNext}>
                                    {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                                </Button>
                            </Box>
                        </React.Fragment>
                    )}
                </Box> 
         </div>*/
    )
}

export default CreateReservationForm
