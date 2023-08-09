import React, {useState} from "react";
import * as style from "./ComponentStyle";
import {ResearchBottomSection} from "./ResearchBottomSection";
import {OptionType} from "./OptionType";
import {ShortAnswerType} from "./ShortAnswerType";
import {LongAnswerType} from "./LongAnswerType";
import {FlexLeftRow} from "./ComponentStyle";
import {TextInputBox} from "./TextInputBox";
import ImageOutlinedIcon from "@mui/icons-material/ImageOutlined";
import {AnswerTypeSelect} from "./AnswerTypeSelect";
import {CheckBoxType} from "./CheckBoxType";
import {DropDownType} from "./DropDownType";

export interface ResearchBoxInfo {
    id ?: number;
    title ?: string;
    type ?: string
}
export const ResearchBox = (researchBoxInfo:ResearchBoxInfo)=> {

    return (
        <style.ResearchDiv>
            <FlexLeftRow justifyContent={'space-between'} gap={8}>
                <TextInputBox title={researchBoxInfo.title}/>
                <ImageOutlinedIcon sx={{fontSize: 24}}/>
                <AnswerTypeSelect type={researchBoxInfo.type}/>
            </FlexLeftRow>
            {researchBoxInfo.type ==="shortAnswer"?
                <ShortAnswerType />
            :researchBoxInfo.type ==='longAnswer' ?
                <LongAnswerType />
            :researchBoxInfo.type ==='multipleChoice'?
                <OptionType />
            :researchBoxInfo.type === 'checkBox' ?
                <CheckBoxType />
            : <DropDownType />
            }
            <ResearchBottomSection id={researchBoxInfo.id}/>
        </style.ResearchDiv>
    )
}