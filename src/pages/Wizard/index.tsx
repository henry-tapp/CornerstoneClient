import KeyboardBackspaceOutlinedIcon from '@mui/icons-material/KeyboardBackspaceOutlined';
import { IconButton } from "@mui/material";
import { alpha, styled } from "@mui/material/styles";
import { useMutation } from '@tanstack/react-query';
import { ITheme } from 'common/App';
import { useApi } from 'hooks/useApi/useApi';
import { useCallback, useState } from "react";
import { Plan, PlanCreationData } from 'types';
import { UserMeasurements } from 'types/UserMeasurements';
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
  option?: string;
  handleStepMove: (currentStep: number, option: string) => void;
}
export function Wizard() {

  const [currentStep, setStepNumber] = useState<number>(1);
  const [step3Option, setStep3Option] = useState<string>("");

  const api = useApi();

  const userMeasurementsMutation = useMutation({
    mutationFn: (data: UserMeasurements) => {
      return api.addUserMeasurements(data);
    },
  });

  const planCreationMutation = useMutation({
    mutationFn: (data: Plan) => {
      return api.createPlan(data);
    },
  });


  const handleStepMove = useCallback((newStep: number, newOption?: string) => {
    setStepNumber(newStep);
    if (newOption && newStep === 3) {
      setStep3Option(newOption);
    }
  }, []);

  const handleSubmit = async (data: PlanCreationData) => {
    try {
      console.log("submitting");
      console.log(data);
      await userMeasurementsMutation.mutateAsync(data.userMeasurements);
      await planCreationMutation.mutateAsync(data.plan);
    }
    catch (e: unknown) {
      loglevel.error((e as Error)?.message ?? e);
    }
  };

  return (
    <PageWrapper>
      {currentStep === 1 && (<Step1 handleStepMove={handleStepMove} />)}
      {currentStep === 2 && <Step2 handleStepMove={handleStepMove} />}
      {currentStep === 3 && (<Step3 handleCreatePlan={handleSubmit} option={step3Option} />)}
      {currentStep > 1 && (
        <BackIconWrapper onClick={() => handleStepMove(currentStep - 1, step3Option)}>
          <KeyboardBackspaceOutlinedIcon />
        </BackIconWrapper>)}
    </PageWrapper>
  );
}

export default Wizard;

