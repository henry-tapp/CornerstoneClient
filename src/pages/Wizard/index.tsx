import KeyboardBackspaceOutlinedIcon from '@mui/icons-material/KeyboardBackspaceOutlined';
import { IconButton } from "@mui/material";
import { alpha, styled, useTheme } from "@mui/material/styles";
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Queries } from 'api';
import { ITheme } from 'common/App';
import { useApi } from 'hooks/useApi/useApi';
import { useCallback, useRef, useState } from "react";
import { useNavigate } from 'react-router-dom';
import LoadingBar, { LoadingBarRef } from 'react-top-loading-bar';
import { PlanCreationData, PlanOptions, PlanType } from 'types';
import { UserMeasurements, UserPreferences } from 'types/User';
import loglevel from 'util/log';
import Step1 from './Step1';
import Step2 from "./Step2";
import Step3 from "./Step3";

const PageWrapper = styled("div")(({ theme }) => `
  position:relative;  
  width: 100%;
  height: 100%;
  background-color: ${(theme as ITheme).palette.shades.g6};
`);

const BackIconWrapper = styled(IconButton)(
  ({ theme }) => `
  position: absolute;
  left: 1rem;
  bottom: 1rem;
  border-radius: 0.5rem;
  background-color: ${alpha((theme as ITheme).palette.shades.g1, 0.8)};
  color:  ${alpha((theme as ITheme).palette.shades.g5, 1)};
  z-index: 300;
  &:hover {
    background-color: ${alpha((theme as ITheme).palette.shades.g1, 0.8)};
    color:  ${alpha((theme as ITheme).palette.shades.g5, 1)};  
  }
`
);

export interface StepProps {
  option?: PlanType;
  handleStepMove: (currentStep: number, option?: PlanType) => void;
}

export function Wizard() {

  const queryClient = useQueryClient();
  const theme = useTheme() as ITheme;
  const navigate = useNavigate();
  const [currentStep, setStepNumber] = useState<number>(1);
  const [step3Option, setStep3Option] = useState<PlanType>();

  const api = useApi();

  const userMeasurementsMutation = useMutation({
    mutationFn: (data: UserMeasurements) => {
      return api.addUserMeasurements(data);
    },
  });

  const userPreferencesMutation = useMutation({
    mutationFn: (data: UserPreferences) => {
      return api.addUserPreferences(data);
    },
  });

  const planCreationMutation = useMutation({
    mutationFn: (data: PlanOptions) => {
      return api.createPlan(data);
    },
  });

  const handleStepMove = useCallback((newStep: number, newOption?: PlanType) => {
    setStepNumber(newStep);
    if (newOption && newStep === 3) {
      setStep3Option(newOption);
    }
  }, []);

  const combinedMutation = useMutation(async (data: PlanCreationData) => {
    let response = await userMeasurementsMutation.mutateAsync(data.userMeasurements);
    if (response.status! > 400) throw new Error("Failed to save measurements");

    response = await userPreferencesMutation.mutateAsync(data.userPreferences);
    if (response.status! > 400) throw new Error("Failed to save preferences");

    data.plan.dateStarting = new Date(data.plan.dateStarting);
    data.plan.peakWeekDateStarting = new Date(data.plan.peakWeekDateStarting);
    data.plan.planType = step3Option!;
    response = await planCreationMutation.mutateAsync(data.plan);
    if (response.status! > 400) throw new Error("Failed to save plan");

    return true;
  });

  const handleSubmit = async (data: PlanCreationData) => {
    try {
      let mutationResponse = combinedMutation.mutateAsync(data);
      ref.current!.continuousStart(5);
      var response = await mutationResponse.then(async (success: boolean) => {
        if (success) {
          queryClient.invalidateQueries({ queryKey: Queries.getPlan() });
        }
        else {
          return "There was something wrong with the information provided please ensure each field is filled in and try again."
        }
      });
      ref.current!.complete();
      return response;
    }
    catch (e: unknown) {
      loglevel.error((e as Error)?.message ?? e);
    }
  };

  const ref = useRef<LoadingBarRef>(null);

  return (
    <PageWrapper>
      <LoadingBar color={theme.palette.tertiary.main} ref={ref} />
      {currentStep === 1 && (<Step1 handleStepMove={handleStepMove} />)}
      {currentStep === 2 && <Step2 handleStepMove={handleStepMove} />}
      {currentStep === 3 && (<Step3 handleCreatePlan={handleSubmit} option={step3Option!} />)}
      {currentStep > 1 && (
        <BackIconWrapper onClick={() => handleStepMove(currentStep - 1, step3Option)}>
          <KeyboardBackspaceOutlinedIcon />
        </BackIconWrapper>)}
    </PageWrapper>
  );
}

export default Wizard;

