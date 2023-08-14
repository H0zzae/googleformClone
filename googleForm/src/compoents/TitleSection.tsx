import React, {ChangeEvent, useState} from "react"
import {PurpleLineDiv, ResearchDiv, RedText} from "./ComponentStyle";
import {Input, TextField, Typography} from "@mui/material";
import {LongAnswerInputBox} from "./LongAnswerInputBox";
import Divider from "@mui/material/Divider";

interface TitleInfo {
    edit : boolean;
}

export const TitleSection = (props:TitleInfo) => {
    const [title, setTitle] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    // @ts-ignore
    return(
    <>
        {props.edit ?
            <ResearchDiv>
                <PurpleLineDiv />
                <Typography variant="h1" sx={{fontSize : '24px !important', fontWeight : 'bold'}} gutterBottom>{title}</Typography>
                <Typography variant="body1" gutterBottom>{description}</Typography>
                <Divider/>
                <RedText>* 표시는 필수 질문임</RedText>
            </ResearchDiv>
        :
            <ResearchDiv>
                <PurpleLineDiv />
                <Input fullWidth placeholder={"설문지 제목"} value={title} onChange={(event:ChangeEvent<HTMLInputElement>) => setTitle(event.target.value)} sx={{fontSize : '24px !important'}} />
                <Input defaultValue={"설문지 설명"} multiline value = {description} onChange={(event:ChangeEvent<HTMLInputElement>) => setDescription(event.target.value)} sx={{margin: '9px 0', width:'100%'}} />
            </ResearchDiv>
        }
    </>
    )
}
