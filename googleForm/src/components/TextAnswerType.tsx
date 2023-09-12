import React, {ChangeEvent, useCallback, useEffect, useMemo, useState} from "react"
import {FlexLeftRow, FlexTopColumn} from "./ComponentStyle";
import {useAppDispatch, useAppSelector} from "../research/config";
import {Input, Typography} from "@mui/material";
import {FormItem, setForm} from "../research/slices/formSlice";
import useOptionsHooks from "./useOptionsHooks";

interface shortAnswerInfo {
    id : number;
    type ?: string;
    disable : boolean;
    status : boolean;
}

export const TextAnswerType = (info:shortAnswerInfo) => {
    const {formList} = useAppSelector(state => state.form);
    const dispatch = useAppDispatch();
    const {value} = useAppSelector(state => state.user);
    const optionsFn = useOptionsHooks(info.id);
    const [text, setText] = useState<string>(formList.map((i) => {
        if (i.id === info.id) return i })[0]?.subject || '');
    const handleTextChange = useCallback((event : ChangeEvent<HTMLInputElement>) => {
        const cpFormList = formList;
        if (info.status) {
            const changed = cpFormList.map((i) => {
                if (i.id === info.id) {
                    return {...i, subject: event.target.value}
                } else return i
            })
            dispatch(setForm(changed))
            setText(event.target.value);
        }else {
            const check = event.target.value.length>0;
            const changed = cpFormList.map((i) => {
                if (i.id === info.id) {
                    return {...i, subject: event.target.value, status : check}
                } else return i
            })
            dispatch(setForm(changed))
            setText(event.target.value);
        }
    },[formList, dispatch])
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
                           error={value==='preview' ? !info.status : false}
                    />
                    : <Typography>{text}</Typography>}
                </FlexLeftRow>
            </FlexTopColumn>
        </>
    )
}