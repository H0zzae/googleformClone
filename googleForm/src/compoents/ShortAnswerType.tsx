import React, {useState} from "react"
import {FlexLeftRow, FlexTopColumn} from "./ComponentStyle";
import {useAppDispatch, useAppSelector} from "../research/config";
import {Input} from "@mui/material";
interface shortAnswerInfo {
    id : number;
    text ?: string;
    type ?: string;
    disable : boolean;
}

export const ShortAnswerType = (sainfo:shortAnswerInfo) => {
    const {formList} = useAppSelector(state => state.form);
    const dispatch = useAppDispatch();
    const [text, setText] = useState<string>('');

    return (
    <>
        <FlexTopColumn>
            <FlexLeftRow>
                <Input disabled={!sainfo.disable} placeholder="단답형 텍스트" value={sainfo.text} sx={{margin: '9px 0', width: 360}}/>
            </FlexLeftRow>
        </FlexTopColumn>
    </>
    )
}