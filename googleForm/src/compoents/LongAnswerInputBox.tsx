import React from "react"
import {Input} from "@mui/material";

interface LongAnswerInfo {
    text ?: string;
    default ?:string;
    disable :boolean;
    props ?:object;
}
const ariaLabel = {'arial-label' : 'description'};
export const LongAnswerInputBox = (linfo:LongAnswerInfo) =>{
    return(
        <Input {...linfo.props} placeholder={linfo.default || "장문형 텍스트"} multiline value = {linfo.text} inputProps={ariaLabel} disabled={!linfo.disable} sx={{margin: '9px 0', width:'100%'}} />
    )
}
