import { useTheme } from '@mui/material';
import Slider from '@mui/material/Slider';
import { Box } from '@mui/system';
import { ITheme } from 'common/App';

export interface CSSliderProps {
    defaultValue: number;
    step: number;
    min: number;
    max: number;
    marks: boolean;
    onChange: (v: number) => void;
}

export default function CSSlider({ defaultValue, step, min, max, marks, onChange }: CSSliderProps) {

    const theme = useTheme() as ITheme;

    return (
        <Box sx={{ width: 300 }}>
            <Slider 
                defaultValue={defaultValue}
                step={step}
                marks={marks}
                min={min}
                max={max}
                valueLabelDisplay="on"
                onChange={(_, value) => {
                    onChange(value as number);
                }}
                sx={{
                    color: theme.palette.shades.g1,
                    height: 4,
                    '& .MuiSlider-thumb': {
                        width: 18,
                        height: 18,
                        transition: '0.3s cubic-bezier(.47,1.64,.41,.8)',
                        '&:before': {
                            boxShadow: '0 2px 12px 0 rgba(0,0,0,0.4)',
                        },
                        '&:hover, &.Mui-focusVisible': {
                            boxShadow: `0px 0px 0px 8px ${theme.palette.mode === 'dark'
                                ? 'rgb(255 255 255 / 16%)'
                                : 'rgb(0 0 0 / 16%)'
                                }`,
                        },
                        '&.Mui-active': {
                            width: 20,
                            height: 20,
                        },
                    },
                    '& .MuiSlider-rail': {
                        opacity: 0.28,
                    },
                    '& .MuiSlider-mark': {
                        backgroundColor: '#bfbfbf',
                        height: 8,
                        '&.MuiSlider-markActive': {
                            opacity: 1,
                            backgroundColor: 'currentColor',
                        },
                    },
                    '& .MuiSlider-valueLabel': {
                        lineHeight: 1.2,
                        fontSize: 12,
                        background: 'unset',
                        padding: 0,
                        width: 16,
                        height: 16,
                        backgroundColor: theme.palette.primary.main,
                        transformOrigin: 'bottom left',
                        '&:before': { display: 'none' },
                    }

                }}
            />
        </Box>
    );
}