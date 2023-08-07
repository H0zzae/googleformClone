import React, {useState} from "react";
import {TextInputBox} from "./TextInputBox";
import * as style from "./ComponentStyle";
import {ResearchBottomSection} from "./ResearchBottomSection";

export interface ResearchBoxInfo {
    id ?: number | undefined;
    title ?: string | undefined;
    type ?: string
}
export const ResearchBox = (researchBoxInfo:ResearchBoxInfo)=> {

    return (
        <style.ResearchDiv>
            <TextInputBox title={researchBoxInfo.title}/>
            <ResearchBottomSection id={researchBoxInfo.id}/>
        </style.ResearchDiv>
    )
}