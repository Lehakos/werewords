import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel, { StepLabelProps } from "@material-ui/core/StepLabel";
import Paper from "@material-ui/core/Paper";
import Divider from "@material-ui/core/Divider";
import Typography from "@material-ui/core/Typography";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";

import { useSelectPlayers, useSelectMaster, savePlayers } from "model/players";
import { nextScreen, ScreensEnum, setScreen } from "model/routing";
import { MIN_PLAYERS } from "shared/constants/config";
import { useAppDispatch } from "shared/app-state";

import { AddPlayersStep } from "./AddPlayersStep";
import { ChooseMasterStep } from "./ChooseMasterStep";
import { FinishStep } from "./FinishStep";

const steps = ["Добавьте игроков", "Выберите ведущего", "Проверьте"];

export const PlayersForm = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formError, setFormError] = useState<null | string>(null);
  const [skipShowRoles, setSkipShowRoles] = useState(false);
  const players = useSelectPlayers();
  const master = useSelectMaster();
  const dispatch = useAppDispatch();
  const isFirstStep = currentStep === 0;
  const isLastStep = currentStep === steps.length - 1;

  const validate = () => {
    if (currentStep === 0) {
      if (players.length < MIN_PLAYERS) {
        return `Должно быть не менее ${MIN_PLAYERS} игроков`;
      }

      if (players.some(({ name }) => !name.trim().length)) {
        return "Заполните все поля";
      }
    }

    if (currentStep === 1) {
      if (!master) {
        return "Выберите ведущего";
      }
    }

    return null;
  };

  const prevStep = () => {
    setCurrentStep((step) => Math.max(step - 1, 0));
  };

  const finish = () => {
    dispatch(savePlayers());

    if (skipShowRoles) {
      dispatch(setScreen(ScreensEnum.chooseWord));
    } else {
      dispatch(nextScreen());
    }
  };

  const nextStep = () => {
    const error = validate();
    setFormError(error);

    if (error) {
      return;
    }

    if (isLastStep) {
      finish();
      return;
    }

    setCurrentStep((step) => step + 1);
  };

  return (
    <Paper>
      <Stepper activeStep={currentStep}>
        {steps.map((label, index) => {
          const labelProps: StepLabelProps = {};

          if (index === currentStep && formError) {
            labelProps.optional = (
              <Typography variant="caption" color="error">
                {formError}
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
        {currentStep === 0 && <AddPlayersStep />}
        {currentStep === 1 && <ChooseMasterStep />}
        {currentStep === 2 && <FinishStep />}
      </Box>

      <Divider />

      <Box display="flex" alignItems="center" px={3} py={2}>
        <Box mr="auto">
          <FormControlLabel
            control={
              <Checkbox
                checked={skipShowRoles}
                onChange={({ target: { checked } }) =>
                  setSkipShowRoles(checked)
                }
              />
            }
            label="Не показывать роли"
          />
        </Box>

        <Button disabled={isFirstStep} onClick={prevStep}>
          Назад
        </Button>

        <Button
          onClick={({ currentTarget }) => {
            nextStep();
            currentTarget.blur();
          }}
        >
          {isLastStep ? "Завершить" : "Вперед"}
        </Button>
      </Box>
    </Paper>
  );
};
