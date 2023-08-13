import React, {ChangeEvent, useState} from "react"
import {ResearchDiv} from "./ComponentStyle";
import {Input, TextField} from "@mui/material";
import {LongAnswerInputBox} from "./LongAnswerInputBox";

interface TitleInfo {
    edit : boolean;
}

export const TitleSection = (props:TitleInfo) => {
    const [title, setTitle] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    return(
        <ResearchDiv>
            <Input fullWidth placeholder={"설문지 제목"} value={title} onChange={(event:ChangeEvent<HTMLInputElement>) => setTitle(event.target.value)} sx={{fontSize : '24px !important'}} />
            <Input defaultValue={"설문지 설명"} multiline value = {description} onChange={(event:ChangeEvent<HTMLInputElement>) => setDescription(event.target.value)} sx={{margin: '9px 0', width:'100%'}} />
        </ResearchDiv>
    )
}
