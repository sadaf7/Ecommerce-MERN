import React from 'react'
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step'
import StepLabel from '@mui/material/StepLabel';

const CheckoutStep = ({ activeStep }) => {

    const steps=[
        {
            label:'Shipping Details',
        },
        {
            label:'Confirm Order',
        },
        {
            label:'Payment',
        },
    ]
  return (
    <>
      <div className='stepper'>
      <Stepper activeStep={1} alternativeLabel>
        {steps.map((item,index) => (
            <Step key={index} active={activeStep===index ? true : false} completed={activeStep===index ? true : false}>
                <StepLabel style={{color:'white'}} className='step_label'>{item.label}</StepLabel>
            </Step>
        ))}
      </Stepper>
      </div>
    </>
  )
}

export default CheckoutStep
