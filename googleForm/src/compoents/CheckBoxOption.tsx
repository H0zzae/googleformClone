import React, {ChangeEvent, FocusEvent, KeyboardEvent, useCallback, useEffect, useState} from "react"
import {FlexLeftRow, FlexTopColumn} from "./ComponentStyle";
import {
    Button,
    Checkbox,
    IconButton,
    Input, TextField,
    Typography
} from "@mui/material";
import ImageOutlinedIcon from "@mui/icons-material/ImageOutlined";
import ClearIcon from '@mui/icons-material/Clear';
import Tooltip from "@mui/material/Tooltip";
import {useAppDispatch, useAppSelector} from "../research/config";
import {setForm} from "../research/slices/formSlice";

interface optionInfo {
    id : number;
    type ?: string;
    activated : boolean;
}
export const CheckBoxOption = (info:optionInfo) => {
    const {formList} = useAppSelector(state => state.form);
    const {value} = useAppSelector(state => state.user);
    const dispatch = useAppDispatch();
    const [newInputText, setNewInputText] = useState<string>();
    const [optionList, setOptionList] = useState<any[]>([]);
    const defaultText = "옵션 "

    useEffect(() => {
        setOptionList(formList[info.id].options || []);
    }, [formList, dispatch]);
    useEffect(() => {
        const initial = optionList.map((i) => {
            return {...i, selected : false}
        })
        saveModOption(initial);
    },[value])
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        console.log("prev : \n", optionList);
        const modOption = optionList.map((i) => {
            if (i.id == event.target.id) {
                return {...i, selected : !(i.selected)}
            }else return i
        })
        saveModOption(modOption)
        console.log("after : \n" , optionList);
    };
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
            const newID = (!optionList.length) ? 0 : Math.max(...optionList.map((item) => item.id)) + 1;
            const modOption = optionList?.concat([{id: newID, value: event.target.value, selected: false}]);
            saveModOption(modOption || []);
            setNewInputText('');
        }
    },[dispatch, formList])

    const addOptionValueWithKeyBoard = useCallback((event:KeyboardEvent<HTMLInputElement>) => {
        if (event.key ==='Enter') {
            const NewID = (!optionList.length) ? 0 : Math.max(...optionList.map((item) => item.id)) + 1;
            const textValue = event.currentTarget.value ==='' ? defaultText + (optionList.length + 1) : event.currentTarget.value;
            const modOption = optionList.concat([{id : NewID, value : textValue, selected : false}]);
            saveModOption(modOption);
            setNewInputText('')
        }
    },[dispatch, formList])

    const removeOption = useCallback((id:number) => {
        const copyForm = [...optionList];
        const removeIndx = copyForm?.findIndex(item => item.id === id);
        if (removeIndx !== undefined) {
            copyForm?.splice(removeIndx, 1);
            saveModOption(copyForm || []);
        }
    },[dispatch, formList])

    const label = (item : string) => ({
        onChange : handleChange,
        inputProps: { 'aria-label': item}
    });

    return (
        <FlexTopColumn>
            {optionList?.map((item) => (
                <FlexLeftRow  justifyContent={'space-between'}>
                    <FlexLeftRow>
                        <Checkbox onChange={handleChange} checked={item.selected} disabled={value==='write'} id={item.id} />
                        {value==='write' && info.activated ?
                            <Input value={item.value}
                                   sx={{margin: '9px 0', width:  600}}
                                   id={item.id}
                                   onChange={(e:ChangeEvent<HTMLInputElement>) => handleTextChange(e, item.id)}
                            />
                            : <Typography>{item.value}</Typography>
                        }
                        {/*hover시 표시됨*/}
                    </FlexLeftRow>
                    {value==='write' && info.activated &&
                        <Tooltip title="이미지 추가">
                            <ImageOutlinedIcon sx={{fontSize: 24}} />
                        </Tooltip>
                    }
                    {/*해당 질문 클릭시에만 표시됨*/}
                    {value==='write' && info.activated && optionList.length>1 &&
                        <Tooltip title="삭제">
                            <IconButton arai-label="clear" onClick={() => removeOption(item.id)}>
                                <ClearIcon />
                            </IconButton>
                        </Tooltip>
                    }
                </FlexLeftRow>
            ))}
            {/*해당 질문 클릭시에만 표시됨*/}
            {value==='write' && info.activated &&
                <FlexLeftRow paddingLeft={0}>
                    <Checkbox disabled />
                    <FlexLeftRow gap={8}>
                        <TextField placeholder={"옵션 추가"} sx={{width: 52 }}
                                   variant="standard"
                                   value={newInputText}
                                   onChange={(event : ChangeEvent<HTMLInputElement>) => setNewInputText(event.target.value)}
                                   onBlur ={addOptionValue}
                                   InputProps={{
                                       onKeyDown:(event:KeyboardEvent<HTMLInputElement>) => {addOptionValueWithKeyBoard(event)}
                                   }}
                        />
                    </FlexLeftRow>
                </FlexLeftRow>
            }
        </FlexTopColumn>
    )
}