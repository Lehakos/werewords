import React from "react";
import { useStore } from "effector-react";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel, { StepLabelProps } from "@material-ui/core/StepLabel";
import Paper from "@material-ui/core/Paper";
import Divider from "@material-ui/core/Divider";
import Typography from "@material-ui/core/Typography";

import {
  nextStepRequest,
  prevStepRequest,
  $activeStep,
  $formError,
  steps,
} from "../model";
import { AddPlayersStep } from "./AddPlayersStep";
import { ChooseMasterStep } from "./ChooseMasterStep";
import { FinishStep } from "./FinishStep";

export const PlayersForm = () => {
  const activeStep = useStore($activeStep);
  const error = useStore($formError);
  const isFirstStep = activeStep === 0;
  const isLastStep = activeStep === steps.length - 1;

  return (
    <Paper>
      <Stepper activeStep={activeStep}>
        {steps.map((label, index) => {
          const labelProps: StepLabelProps = {};

          if (index === activeStep && error) {
            labelProps.optional = (
              <Typography variant="caption" color="error">
                {error}
              </Typography>
            );
            labelProps.error = true;
          }
          return (
            <Step key={label}>
              <StepLabel {...labelProps}>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>

      <Box pb={3} px={4}>
        {activeStep === 0 && <AddPlayersStep />}
        {activeStep === 1 && <ChooseMasterStep />}
        {activeStep === 2 && <FinishStep />}
      </Box>

      <Divider />

      <Box width={1} px={3} py={2}>
        <Button disabled={isFirstStep} onClick={() => prevStepRequest()}>
          Назад
        </Button>
        <Button
          onClick={({ currentTarget }) => {
            nextStepRequest();
            currentTarget.blur();
          }}
        >
          {isLastStep ? "Завершить" : "Вперед"}
        </Button>
      </Box>
    </Paper>
  );
};
