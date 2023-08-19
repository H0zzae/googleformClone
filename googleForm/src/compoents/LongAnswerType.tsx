import React from "react"
import {FlexLeftRow, FlexTopColumn} from "./ComponentStyle";
import {Input} from "@mui/material";

interface longAnswerInfo {
    id : number;
    text ?: string;
    type ?: string;
    disable : boolean;
}

export const LongAnswerType = (lainfo : longAnswerInfo) => {
    return (
        <>
            <FlexTopColumn>
                <FlexLeftRow>
                    <Input placeholder={"장문형 텍스트"} multiline value = {lainfo.text} disabled={!lainfo.disable} sx={{margin: '9px 0', width:'100%'}} />
                </FlexLeftRow>
            </FlexTopColumn>
        </>
    )
}
