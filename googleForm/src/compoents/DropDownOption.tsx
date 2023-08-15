import React, {ChangeEvent, FocusEvent, KeyboardEvent, useCallback, useEffect, useState} from "react"
import {FlexLeftRow, FlexTopColumn} from "./ComponentStyle";
import {Button, Checkbox, IconButton, Input, TextField, Typography} from "@mui/material";
import {ShortAnswerInputBox} from "./ShortAnswerInputBox";
import Tooltip from "@mui/material/Tooltip";
import ImageOutlinedIcon from "@mui/icons-material/ImageOutlined";
import ClearIcon from "@mui/icons-material/Clear";
import {useAppDispatch, useAppSelector} from "../research/config";
import {setForm} from "../research/slices/formSlice";

interface optionInfo {
    id : number;
    type ?: string;
}
export const DropDownOption = (info:optionInfo) => {
    const {formList} = useAppSelector(state => state.form);
    const {value} = useAppSelector(state => state.user);
    const dispatch = useAppDispatch();
    const [newInputText, setNewInputText] = useState<string>();
    const [count, setCount] = useState<number>(1);
    const [optionList, setOptionList] = useState<any[]>([]);
    const defaultText = "옵션 "

    useEffect(() => {
        setOptionList(formList[info.id].options || []);
    }, [formList, dispatch]);

    const createLi = () =>{
        setCount(count+1);
    }
    const delelteLi = () =>{
        setCount(count-1);
    }
    const saveModOption = (changed:any[]) => {
        const modForm = formList.map((i) => {
            if (i.id ===info.id) {
                return {...i, options : changed}
            }else return i
        })
        dispatch(setForm(modForm));
        setOptionList(changed);
    }

    const handleTextChange = useCallback((event : ChangeEvent<HTMLInputElement>, id:number) => {
        const modOption = optionList?.map((i) => {
            if (i?.id === id) {
                return {...i, value: event.target.value}
            } else return i
        });
        saveModOption(modOption);
    },[dispatch, formList]);

    const addOptionValue = useCallback((event : FocusEvent<HTMLInputElement>) => {
        if (newInputText !=='') {
            const targetForm = formList[info.id];
            const newID = (!optionList.length) ? 0 : Math.max(...optionList.map((item) => item.id)) + 1;
            const modOption = targetForm?.options?.concat([{id: newID, value: event.target.value, selected: false}]);
            saveModOption(modOption || []);
            setNewInputText('');
            createLi();
        }
    },[dispatch, formList])

    const addOptionValueWithKeyBoard = useCallback((event:KeyboardEvent<HTMLInputElement>) => {
        if (event.key ==='Enter') {
            const NewID = (!optionList.length) ? 0 : Math.max(...optionList.map((item) => item.id)) + 1;
            const textValue = event.currentTarget.value ==='' ? defaultText + (optionList.length + 1) : event.currentTarget.value;
            const modOption = optionList.concat([{id : NewID, value : textValue, selected : false}]);
            saveModOption(modOption);
            setNewInputText('')
            createLi();
        }
    },[dispatch, formList])

    const removeOption = useCallback((id:number) => {
        const copyForm = [...optionList];
        const removeIndx = copyForm?.findIndex(item => item.id ===id);
        if (removeIndx!==undefined) {
            copyForm?.splice(removeIndx, 1);
            saveModOption(copyForm || []);
            delelteLi();
        }
    },[dispatch, formList])

    return(
        <FlexTopColumn>
            {optionList?.map((item, idx) => (
                <FlexLeftRow justifyContent={'space-between'}>
                    <FlexLeftRow>
                        <Typography sx={{padding: '9px 9px 9px 0'}}>{idx +1}</Typography>
                        <Input value={item.value}
                               sx={{margin: '9px 0', width:  600}}
                               id={item.id}
                               onChange={(e:ChangeEvent<HTMLInputElement>) => handleTextChange(e, item.id)}
                        />
                    </FlexLeftRow>
                    {/*해당 질문 클릭시에만 표시됨*/}
                    {value==='write' && optionList.length >1 &&
                        <Tooltip title="삭제">
                            <IconButton arai-label="clear" onClick={() => removeOption(item.id)}>
                                <ClearIcon />
                            </IconButton>
                        </Tooltip>
                    }
                </FlexLeftRow>
            ))}
            {/*해당 질문 클릭시에만 표시됨*/}
            {value==='write' &&
                <FlexLeftRow paddingLeft={0}>
                    {/*padding: 9px 9px 9px 0, width: 24*/}
                    <Typography sx={{padding: '9px 9px 9px 0'}}>{count+1}</Typography>
                    <FlexLeftRow gap={8}>
                        <TextField placeholder={"옵션 추가"} sx={{width: 52 }}
                                   variant={'standard'}
                                   value={newInputText}
                                   onChange={(event : ChangeEvent<HTMLInputElement>) => setNewInputText(event.target.value)}
                                   onBlur ={addOptionValue}
                                   InputProps={{
                                       onKeyDown:(event:KeyboardEvent<HTMLInputElement>) => {addOptionValueWithKeyBoard(event)}
                                   }}
                        />
                        <Typography variant={"body1"}> 또는 </Typography>
                        <Button variant={"text"} size={"small"} sx={{color: "#1976d2"}}>'기타' 추가</Button>
                    </FlexLeftRow>
                </FlexLeftRow>
            }
        </FlexTopColumn>
    )
}