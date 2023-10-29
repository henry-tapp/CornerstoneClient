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
import { PlanOptions, PlanType } from "types";
import { UserMeasurementsAndPreferences, WeightUnits } from "types/User";
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

const weightUnits = [{ value: "Kilograms", text: "Kilograms" }, { value: "Pounds", text: "Pounds" }, { value: "Stones", text: "Stones" }];
const initialDialogStates = [
    { id: 0, state: false },
    { id: 1, state: false },
    { id: 2, state: false },
    { id: 3, state: false }
];

const daysInWeek = [
    { value: 0, text: "0" },
    { value: 1, text: "1" },
    { value: 2, text: "2" },
    { value: 3, text: "3" },
    { value: 4, text: "4" },
    { value: 5, text: "5" },
    { value: 6, text: "6" },
    { value: 7, text: "7" },
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

function getPeakWeekDates() {
    var nextMonday = new Date();
    nextMonday.setDate(nextMonday.getDate() + (1 + 7 - nextMonday.getDay()) % 7);

    return [7, 8, 9, 10, 11].map(i => {
        let date = new Date(nextMonday.setDate(nextMonday.getDate() + (7 * i)));
        return {
            value: date.toDateString(), text: date.toDateString()
        };
    });
}

export interface FinalStepProps extends Omit<StepProps, "handleStepMove"> {
    handleCreatePlan: (data: any) => Promise<string | undefined>;
}

const Step3 = (props: FinalStepProps) => {

    const theme = useTheme();

    const [errors, setErrors] = useState<string>("");

    const [measurementsAndPreferences, setMeasurements] = useState<UserMeasurementsAndPreferences>();
    const [openStates, setOpen] = useState(initialDialogStates);

    const repeaterInformation = useRepeaterInformation();
    const maxHangInformation = useMaxHangInformation();
    const flexibilityInformation = useHipFlexibilityInformation();
    const submitInformation = useSubmitInformation(PlanType[props.option!]);
    const weekStartingValues = getWeekStartingDates();
    const peakWeekValues = getPeakWeekDates();

    const {
        register: registerFormMeasurements,
        handleSubmit: handleSubmitMeasurements,
        setValue: setMeasurementValue,
        formState: { isValid: isValidMeasurements }
    } = useForm<UserMeasurementsAndPreferences>({
        mode: "onChange",
        defaultValues: {
            preferences: {
                weightUnits: "Kilograms"
            }
        }
    });

    const {
        handleSubmit: handleSubmitPlan,
        formState: { isValid: isValidPlan },
        setValue
    } = useForm<PlanOptions>({
        mode: "onChange",
        defaultValues: {
            planType: props.option,
            dateStarting: new Date(weekStartingValues[0].value),
            peakWeek: new Date(peakWeekValues[0].value),
            availableWeeklyOutdoorClimbDays: 0
        }
    });

    const handleToggleDialogForId = useCallback((id: number, newState: boolean) => {
        let statesCopy = [...openStates];
        let dialog = statesCopy[id];
        dialog.state = newState;
        statesCopy[id] = dialog;
        setOpen(statesCopy);
    }, [setOpen, openStates]);

    const handleClickMeasurementsFinish = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {

        e.preventDefault();
        if (isValidMeasurements) {
            handleSubmitMeasurements((measurements: UserMeasurementsAndPreferences) => {
                setMeasurements(measurements);
                handleToggleDialogForId(3, true)
            })();
        }

    }, [isValidMeasurements, handleToggleDialogForId, handleSubmitMeasurements, setMeasurements]);

    const coordinateSubmit = useCallback(async () => {
        handleSubmitPlan(async (plan: PlanOptions) => {
            setErrors(await props.handleCreatePlan({
                plan: plan,
                userMeasurements: measurementsAndPreferences?.measurements,
                userPreferences: measurementsAndPreferences?.preferences
            }) ?? "");

        })();
    }, [handleSubmitPlan, props, measurementsAndPreferences]);

    return (
        <Fade duration={2000}>
            <Wrapper>
                <form>
                    <FlexBox>
                        <StyledImg src={image} alt="" />
                        <AbsolutePositionWrapper>
                            <FormContainer>
                                <Title>
                                    <Typography variant="h5" >Taking Measurements...</Typography>
                                </Title>
                                <CSSelect setValue={(v: string) => setMeasurementValue("preferences.weightUnits", v as WeightUnits, { shouldValidate: true })} menuItems={weightUnits} helperText="Prefered Weight Unit" label={"WeightUnits"} defaultValue={weightUnits[0].value} />
                                <CSTextField register={registerFormMeasurements} path="measurements.bodyWeight" required label="Body Weight" type="number" />
                                <CSTextField register={registerFormMeasurements} path="measurements.height" required label="Height (cm)" type="number" />
                                <CSTextField register={registerFormMeasurements} path="measurements.maxHang" required label="Max Weighted Hang (7 second)" type="number" info handleOpenInfo={() => handleToggleDialogForId(0, true)} />
                                <CSTextField register={registerFormMeasurements} path="measurements.maxRepeater" required label="Max 60% Bodyweight Repeater" type="number" info handleOpenInfo={() => handleToggleDialogForId(1, true)} />
                                <CSTextField register={registerFormMeasurements} path="measurements.hipFlexibility" required label="Hip Flexibility (Side Split) Cm" type="number" info handleOpenInfo={() => handleToggleDialogForId(2, true)} />
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
                        disabled={!isValidMeasurements}
                        onClick={handleClickMeasurementsFinish}
                        type="submit"
                    >
                        <Typography variant="subtitle1">Finish</Typography>
                    </CreatePlanButton>
                </form>
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
                disabled={!isValidPlan}
            >
                <FormContainer>
                    <CSSelect
                        type="Date"
                        menuItems={weekStartingValues}
                        label={"WeekStarting"}
                        helperText="When do you want to start your plan?"
                        defaultValue={weekStartingValues[0].value}
                        setValue={(v: string) => setValue("dateStarting", new Date(v), { shouldValidate: true })}
                    />
                    <CSSelect
                        type="Date"
                        menuItems={peakWeekValues}
                        label={"PeakWeek"}
                        helperText="When do you want your plan to peak?"
                        defaultValue={peakWeekValues[0].value}
                        setValue={(v: string) => setValue("peakWeek", new Date(v), { shouldValidate: true })}
                    />
                    <CSSelect
                        type="number"
                        menuItems={daysInWeek}
                        label="Weekly outdoor sessions?"
                        helperText="How many outdoor climbing sessions do you want scheduled a week?"
                        defaultValue={daysInWeek[0].value.toString()}
                        setValue={(v: string) => setValue("availableWeeklyOutdoorClimbDays", parseInt(v), { shouldValidate: true })}
                    />
                    <Typography variant="overline">{errors}</Typography>
                </FormContainer>
            </ActionDialog>
        </Fade >
    )
}

export default Step3;