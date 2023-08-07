import React from "react";
import {TextInputDiv} from "./ComponentStyle"
interface TextItem {
    id?: number,
    title?: string,
    checked?: boolean,
    activated?: boolean,
}

export const TextInputBox = (ti:TextItem)=>{
    return(
        <TextInputDiv>
        <p>{ti.title}</p>
        </TextInputDiv>
    )
}