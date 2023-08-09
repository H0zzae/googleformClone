import React from "react"
import {Input} from "@mui/material";

interface LongAnswerInfo {
    text ?: string;
}
const ariaLabel = {'arial-label' : 'description'};
export const LongAnswerInputBox = (linfo:LongAnswerInfo) =>{
    return(
        <Input defaultValue="장문형 텍스트" multiline value = {linfo.text} inputProps={ariaLabel} disabled sx={{margin: '9px 0', width:'100%'}} />
    )
}
