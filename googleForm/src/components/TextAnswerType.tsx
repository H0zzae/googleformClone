import React, {ChangeEvent, useCallback, useState} from "react"
import {FlexLeftRow, FlexTopColumn} from "./ComponentStyle";
import {useAppDispatch, useAppSelector} from "../research/config";
import {Input, Typography} from "@mui/material";
import {setForm} from "../research/slices/formSlice";

interface shortAnswerInfo {
    id : number;
    type ?: string;
    disable : boolean;
    necessary : boolean;
}

export const TextAnswerType = (info:shortAnswerInfo) => {
    const {formList} = useAppSelector(state => state.form);
    const dispatch = useAppDispatch();
    const {value} = useAppSelector(state => state.user);
    const [text, setText] = useState<string>(formList.map((i) => {
        if (i.id === info.id) return i })[0]?.subject || '');

    const handleTextChange = useCallback((event : ChangeEvent<HTMLInputElement>) => {
        const changed = formList.map((i) => {
            if (i.id === info.id) {
                return {...i, subject: event.target.value}
            } else return {...i}
        })
        dispatch(setForm(changed))
        setText(event.target.value);
    },[dispatch])
    return (
        <>
            <FlexTopColumn>
                <FlexLeftRow>
                    {value!=='submit'?
                    <Input disabled={!info.disable}
                           placeholder={info.type ==='shortAnswer' ? "단답형 텍스트" : "장문형 텍스트"}
                           multiline={info.type ==='longAnswer'}
                           value={text}
                           onChange={handleTextChange}
                           sx={{margin: '9px 0', width: info.type==='shortAnswer' ? 360 : '100%'}}
                           error={!info.necessary}
                    />
                    : <Typography>{text}</Typography>}
                </FlexLeftRow>
            </FlexTopColumn>
        </>
    )
}