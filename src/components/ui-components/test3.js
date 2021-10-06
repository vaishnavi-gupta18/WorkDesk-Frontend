import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepContent from '@mui/material/StepContent';
import ReactHtmlParser from 'react-html-parser';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';

export default function VerticalLinearStepper(props) {
  const [activeStep, setActiveStep] = React.useState(0);

  return (
    <Box sx={{ maxWidth: 400 }}>
      <Stepper nonLinear activeStep={activeStep} orientation="vertical">
        {props && props.cardData && props.cardData.map((step,index) => (
          <Step key={index}>
            <StepLabel
              optional={
                  <Typography variant="caption">Due {step && step.due_date.slice(0,10)} , {step && step.due_date.slice(11,16)}</Typography>
              }
              onClick={()=>setActiveStep(index)}
            >
              <Typography variant="h6">{step.title}</Typography>
            </StepLabel>
            <StepContent>
              <Typography>{ReactHtmlParser(step.description)}</Typography>
              <Box sx={{ mb: 2 }}>
              </Box>
            </StepContent>
          </Step>
        ))}
      </Stepper>
    </Box>
  );
}
