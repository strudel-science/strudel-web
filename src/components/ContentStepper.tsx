import React, { PropsWithChildren } from 'react';
import { Box, Button, Paper, Step, StepContent, StepLabel, StepProps, Stepper, Typography, useTheme } from '@mui/material';

/**
 * Customized MUI Stepper component that is styled to our theme
 * and used for content display only, not navigational stepping.
 */
export const ContentStepper: React.FC<PropsWithChildren> = ({ children }) => {
  const theme = useTheme();

  return (
    <Box>
      <Stepper 
        orientation="vertical"
        sx={{
          '& .MuiStepIcon-root.Mui-active.MuiSvgIcon-root': {
            overflow: 'visible',
            color: 'black',
            '& circle': {
              fill: 'none',
              r: 15,
              stroke: theme.palette.error.main,
              strokeWidth: 2,
            },
            '& text': {
              fill: 'black',
              fontSize: '1rem',
            }
          },
          '& .MuiStepConnector-line': {
            borderColor: 'error.main',
            borderLeftStyle: 'dashed',
            borderLeftWidth: 2
          },
          '& .MuiStep-root:not(:last-child) .MuiStepContent-root': {
            borderColor: 'error.main',
            borderLeftStyle: 'dashed',
            borderLeftWidth: 2,
          },
          '& .MuiStepContent-root': {
            paddingLeft: 3.25,
          },
          '& .MuiStepLabel-label': {
            marginLeft: 1,
          },
        }}
      >
        {children}
      </Stepper>
    </Box>
  );
};

/**
 * Custom Step component to be used inside of ContentStepper.
 * Same as MUI Step component, but it is set to always be active 
 * so that its inner content is always visible.
 */
export const ContentStep: React.FC<StepProps> = ({ children, ...rest }) => {
  return (
    <Step {...rest} active={true}>
      {children}
    </Step>
  );
}