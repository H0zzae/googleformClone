import React, {useState} from "react";
import * as style from "./ComponentStyle";
import {ResearchBottomSection} from "./ResearchBottomSection";
import {OptionType} from "./OptionType";
import {ShortAnswerType} from "./ShortAnswerType";
import {LongAnswerType} from "./LongAnswerType";

export interface ResearchBoxInfo {
    id ?: number;
    title ?: string;
    type ?: string
}
export const ResearchBox = (researchBoxInfo:ResearchBoxInfo)=> {

    return (
        <style.ResearchDiv>
            {researchBoxInfo.type ==="shortAnswer"?
                <ShortAnswerType type={researchBoxInfo.type}/>
            :researchBoxInfo.type ==='longAnswer' ?
                <LongAnswerType type={researchBoxInfo.type} />
            :researchBoxInfo.type ==='multipleChoice'?
                <OptionType />
            :<div>아직구현안됨</div>
            }
            <ResearchBottomSection id={researchBoxInfo.id}/>
        </style.ResearchDiv>
    )
}