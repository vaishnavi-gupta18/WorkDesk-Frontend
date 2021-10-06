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

const steps = [
  {
    label: 'Select campaign settings',
    description: `For each ad campaign that you create, you can control how much
              you're willing to spend on clicks and conversions, which networks
              and geographical locations you want your ads to show on, and more.`,
  },
  {
    label: 'Create an ad group',
    description:
      'An ad group contains one or more ads which target a shared set of keywords.',
  },
  {
    label: 'Create an ad',
    description: `Try out different ad text to see what brings in the most customers,
              and learn how to enhance your ads using features like ad extensions.
              If you run into any problems with your ads, find out how to tell if
              they're running and how to resolve approval issues.`,
  },
];

export default function VerticalLinearStepper(props) {
  const [activeStep, setActiveStep] = React.useState(0);

  return (
    <Box sx={{ maxWidth: 400 }}>
      <Stepper nonLinear activeStep={activeStep} orientation="vertical">
        {props.cardData.sort((a, b) => a.due_date > b.due_date).map((step,index) => (
          <Step key={index}>
            <StepLabel
              optional={
                  <Typography variant="caption">Due {step && step.due_date.slice(0,10)} , {step && step.due_date.slice(11,16)}</Typography>
              }
              onClick={()=>setActiveStep(index)}
            >
              {step.title}
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
