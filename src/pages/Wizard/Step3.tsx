import { Button, Typography, alpha, styled, useTheme } from "@mui/material";
import { ITheme } from "common/App";
import { ActionDialog } from "components/Dialog/ActionDialog";
import { InfoDialog } from "components/Dialog/InfoDialog";
import CSSelect from "components/FormItems/CSSelect";
import CSTextField from "components/FormItems/CSTextField";
import { useHipFlexibilityInformation, useMaxHangInformation, useRepeaterInformation, useSubmitInformation } from "hooks/useWizard/useFocusData";
import { useCallback, useState } from "react";
import { Fade } from "react-awesome-reveal";
import { useForm } from 'react-hook-form';
import { PlanCreationData } from "types";
import { StepProps } from ".";
import image from '../../images/gen/real-bw-boulderer-2.jpeg';

const Wrapper = styled("div")(({ theme }) => `
    position: relative;
    min-height: 100vh;
`);

const FlexBox = styled("div")`
    border-radius: 0 0 1rem 1rem;
    position:relative;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const StyledImg = styled("img")`
    height: 100vh;
`;

const Title = styled("div")(({ theme }) => `
    padding-top: 3rem;
    color: ${(theme as ITheme).palette.shades.g5};
    border-radius: 0.5rem;
    padding-bottom: 1rem;
`);

const AbsolutePositionWrapper = styled("div")(({ theme }) => `
    position: absolute;
    top: 0;
    left: 0;
    min-width: 100%;
    min-height: 100vh;
`);

const FormContainer = styled("div")`
    position: relative;
    display:flex;
    flex-direction: column;
    width: calc(100%- 5rem);
    gap: 2rem;
    margin: auto;
    width: calc(100% - 2rem);
    max-width: 40rem;
    padding-inline: 1rem 1rem;
    padding-top:1rem;
`

const Grid = styled("div")`
    display: grid;
    grid-template-columns: 2fr 1fr;
    gap: 0.2rem;
`
const CreatePlanButton = styled(Button)(({ theme }) => `
    position: absolute;
    bottom: 1rem;
    right: 1rem;
    border-radius: 0.5rem;
    background-color: ${alpha((theme as ITheme).palette.tertiary.main, 0.9)};
    width: 9rem;
    margin: auto;
    text-align: center;
    line-height: 2rem;
`);

const units = [{ value: "Kilograms", text: "Kilograms" }, { value: "Pounds", text: "Pounds" }, { value: "Stones", text: "Stones" }];
const initialDialogStates = [
    { id: 0, state: false },
    { id: 1, state: false },
    { id: 2, state: false },
    { id: 3, state: false }
];

function getWeekStartingDates() {
    var nextMonday = new Date();
    nextMonday.setDate(nextMonday.getDate() + (1 + 7 - nextMonday.getDay()) % 7);

    return [0, 1, 2, 3, 4].map(i => {
        let date = new Date(nextMonday.setDate(nextMonday.getDate() + (7 * i)));
        return {
            value: date.toDateString(), text: date.toDateString()
        };
    });
}

export interface FinalStepProps extends Omit<StepProps, "handleStepMove"> {
    handleCreatePlan: (data: any) => void;
}

const Step3 = (props: FinalStepProps) => {
    const theme = useTheme();

    const [openStates, setOpen] = useState(initialDialogStates);

    const repeaterInformation = useRepeaterInformation();
    const maxHangInformation = useMaxHangInformation();
    const flexibilityInformation = useHipFlexibilityInformation();
    const submitInformation = useSubmitInformation(props.option!);
    const weekStartingValues = getWeekStartingDates();

    const {
        register,
        handleSubmit,
        formState: { isValid }
    } = useForm<PlanCreationData>({
        mode: "onChange"
    });

    const handleToggleDialogForId = useCallback((id: number, newState: boolean) => {
        let statesCopy = [...openStates];
        let dialog = statesCopy[id];
        dialog.state = newState;
        statesCopy[id] = dialog;
        setOpen(statesCopy);
    }, [setOpen, openStates]);

    const handleClick = useCallback(async () => {

        if (isValid)
            handleToggleDialogForId(3, true)

    }, [isValid, handleToggleDialogForId]);

    const coordinateSubmit = useCallback(async () => {
        handleSubmit((data: any) => props.handleCreatePlan(data))();
    }, [handleSubmit, props]);

    return (
        <form>
            <Fade duration={2000}>
                <Wrapper>
                    <FlexBox>
                        <StyledImg src={image} alt="" />
                        <AbsolutePositionWrapper>
                            <FormContainer>
                                <Title>
                                    <Typography variant="h5" >Taking Measurements...</Typography>
                                </Title>
                                <Grid>
                                    <CSTextField register={register} path="userMeasurements.bodyWeight" required label="Body Weight" type="number" />
                                    <CSSelect path="userMeasurements.bodyWeightUnits" register={register} menuItems={units} label={"Units"} value={units[0].value} />
                                </Grid>
                                <CSTextField register={register} path="userMeasurements.height" required label="Height (cm)" type="number" />
                                <CSTextField register={register} path="userMeasurements.wingspan" required label="Wingspan (cm)" type="number" />
                                <Grid>
                                    <CSTextField register={register} path="userMeasurements.maxHang" required label="Max Weighted Hang (7 second)" type="number" info handleOpenInfo={() => handleToggleDialogForId(0, true)} />
                                    <CSSelect path="userMeasurements.maxHangUnits" register={register} menuItems={units} label={"Units"} value={units[0].value} />
                                </Grid>
                                <CSTextField register={register} path="userMeasurements.maxRepeater" required label="Max 60% Bodyweight Repeater" type="number" info handleOpenInfo={() => handleToggleDialogForId(1, true)} />
                                <CSTextField register={register} path="userMeasurements.hipFlexibility" required label="Hip Flexibility (Side Split) Cm" type="number" info handleOpenInfo={() => handleToggleDialogForId(2, true)} />
                            </FormContainer>
                        </AbsolutePositionWrapper>
                    </FlexBox>
                    <CreatePlanButton
                        sx={{
                            "&.Mui-disabled": {
                                background: "#eaeaea",
                                color: "#c0c0c0"
                            }
                        }}
                        style={{ color: (theme as ITheme).palette.shades.g1 }}
                        disabled={!isValid}
                        onClick={() => handleClick()}
                    >
                        <Typography variant="subtitle1">Finish</Typography>
                    </CreatePlanButton>
                </Wrapper>
                <InfoDialog title={maxHangInformation.title} description={maxHangInformation.description} handleClose={() => handleToggleDialogForId(0, false)} open={openStates[0].state} />
                <InfoDialog title={repeaterInformation.title} description={repeaterInformation.description} handleClose={() => handleToggleDialogForId(1, false)} open={openStates[1].state} />
                <InfoDialog title={flexibilityInformation.title} description={flexibilityInformation.description} handleClose={() => handleToggleDialogForId(2, false)} open={openStates[2].state} />
                <ActionDialog
                    title={submitInformation.title}
                    description={submitInformation.description}
                    actionText="Create Plan"
                    open={openStates[3].state}
                    handleClose={() => handleToggleDialogForId(3, false)}
                    handleSubmit={coordinateSubmit}
                >
                    <FormContainer>
                        <CSSelect
                            path="plan.weekStarting"
                            register={register}
                            menuItems={weekStartingValues}
                            label={"WeekStarting"}
                            value={weekStartingValues[0].value}
                        />
                    </FormContainer>
                </ActionDialog>
            </Fade >
        </form >
    )
}

export default Step3;