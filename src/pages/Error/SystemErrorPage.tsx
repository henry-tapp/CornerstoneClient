import { Typography } from "@mui/material";
import { Wrapper } from "style/styles";
import { ErrorProps } from "./ErrorProps";

export default function SystemErrorPage({ message }: ErrorProps) {


    return (<Wrapper><Typography variant="subtitle1">{message}</Typography></Wrapper>)
}