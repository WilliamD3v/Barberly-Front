import React from "react";
import { StepperContainer, Step, StepNumber, StepLabel, Line } from "./styled";

interface StepperProps {
  currentStep: number;
  steps: string[];
}

export const Stepper: React.FC<StepperProps> = ({ currentStep, steps }) => {
  return (
    <StepperContainer>
      {steps.map((label, index) => (
        <React.Fragment key={index}>
          <Step active={index <= currentStep}>
            <StepNumber>{index + 1}</StepNumber>
            <StepLabel>{label}</StepLabel>
          </Step>
          {index < steps.length - 1 && <Line active={index < currentStep} />}
        </React.Fragment>
      ))}
    </StepperContainer>
  );
};
