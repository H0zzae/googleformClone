import React from "react";

interface TextItem {
    id?: number,
    title?: string,
    checked?: boolean,
    activated?: boolean,
}

export const TextInputBox = (ti:TextItem)=>{
        return(
            <>
            <p>{ti.title}</p>
            </>
        )
}