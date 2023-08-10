import React from "react"
import {ResearchDiv} from "./ComponentStyle";
import {Input, TextField} from "@mui/material";
import {LongAnswerInputBox} from "./LongAnswerInputBox";

export const TitleSection = () => {
    return(
        <ResearchDiv>
            <Input fullWidth placeholder={"설문지 제목"} sx={{fontSize : '24px !important'}}/>
            <LongAnswerInputBox default={"설문지 설명"} />
        </ResearchDiv>
    )
}
