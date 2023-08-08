import React, {useState} from "react";
import * as style from "./ComponentStyle";
import {ResearchBottomSection} from "./ResearchBottomSection";
import {OptionType} from "./OptionType";
import {ShortAnswerType} from "./ShortAnswerType";

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
                :
                <OptionType />
            }
            <ResearchBottomSection id={researchBoxInfo.id}/>
        </style.ResearchDiv>
    )
}