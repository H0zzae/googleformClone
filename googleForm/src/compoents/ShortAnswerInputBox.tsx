import React from "react"
import {Input} from "@mui/material";

interface ShortAnswerInfo {
    text ?: string;
}
const ariaLabel = {'arial-label' : 'description'};
export const ShortAnswerInputBox = (sinfo:ShortAnswerInfo) =>{
    return(
        <Input defaultValue="단답형 텍스트" value = {sinfo.text} inputProps={ariaLabel} disabled sx={{height : 48, width:360}} />
    )
}
