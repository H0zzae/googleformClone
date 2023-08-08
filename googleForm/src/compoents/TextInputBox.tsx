import React from "react";
import {FlexLeftRow, TextInputDiv} from "./ComponentStyle"
import {TextField} from "@mui/material";
interface TextItem {
    id?: number,
    title?: string,
    checked?: boolean,
    activated?: boolean,
}

export const TextInputBox = (info:TextItem)=>{
    return (
        <FlexLeftRow justifyContent={'space-between'}>
            <TextField
                hiddenLabel
                id="filled-hidden-label-normal"
                defaultValue={"이름"}
                value={info.title}
                variant="filled"
                sx={{width : 446, padding : 0}}
            />
        </FlexLeftRow>
    );
}