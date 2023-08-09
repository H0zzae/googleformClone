import React from "react"
import {Input} from "@mui/material";

interface ShortAnswerInfo {
    text ?: string;
    activate ?: boolean;
    fullWidth ?: boolean;
}
const ariaLabel = {'arial-label' : 'description'};
export const ShortAnswerInputBox = (sinfo:ShortAnswerInfo) =>{
    return (
        <>{
          sinfo.activate ?
              <Input defaultValue="단답형 텍스트" value={sinfo.text} inputProps={ariaLabel} sx={{margin: '9px 0',width: sinfo.fullWidth ? 550 : 360}}/>
          :<Input defaultValue="단답형 텍스트" value={sinfo.text} inputProps={ariaLabel} sx={{margin: '9px 0', width: sinfo.fullWidth ? 550 : 360}}/>
        }</>
    )
}
