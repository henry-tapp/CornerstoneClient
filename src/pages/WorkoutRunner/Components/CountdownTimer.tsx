import { Typography } from "@mui/material";

export interface CountdownRendererProps {
    seconds: number;
    completed: boolean;
}

// Renderer callback with condition
export const CountdownRenderer = ({ seconds }: CountdownRendererProps) => {

    return <Typography variant="h1">{seconds}</Typography>;
};
