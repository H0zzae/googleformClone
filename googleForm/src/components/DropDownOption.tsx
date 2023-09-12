import React, {ChangeEvent, FocusEvent, KeyboardEvent, useCallback, useEffect, useState} from "react"
import {FlexLeftRow, FlexTopColumn} from "./ComponentStyle";
import {IconButton, Input, MenuItem, Select, SelectChangeEvent, TextField, Typography} from "@mui/material";
import Tooltip from "@mui/material/Tooltip";
import ClearIcon from "@mui/icons-material/Clear";
import {useAppDispatch, useAppSelector} from "../research/config";
import useOptionsHooks, {optionInfo} from "./useOptionsHooks";
import Divider from "@mui/material/Divider";


export const DropDownOption = (info:optionInfo) => {
    const {formList} = useAppSelector(state => state.form);
    const {value} = useAppSelector(state => state.user);
    const dispatch = useAppDispatch();
    const [newInputText, setNewInputText] = useState<string>();
    const [count, setCount] = useState<number>(1);
    const [optionList, setOptionList] = useState<any[]>([]);
    const [answer, setAnswer] = useState<string>('');
    const [answerValue, setAnswerValue] = useState<string>('');
    const optionsfun = useOptionsHooks(info.id);

    useEffect(() => {
        setOptionList(optionsfun.currentOption)
        setNewInputText('');
    }, [formList, dispatch]);

    useEffect(() => {
        optionsfun.resetOptionSelected();
    }, [value]);

    const createLi = () =>{
        setCount(count+1);
    }
    const delelteLi = () =>{
        setCount(count-1);
    }

    const addOptionValue = useCallback((event : FocusEvent<HTMLInputElement>) => {
        optionsfun.addOptionValue(event);
        createLi();
    },[dispatch, formList])

    const addOptionValueWithKeyBoard = useCallback((event:KeyboardEvent<HTMLInputElement>) => {
        if (event.key ==='Enter') {
            optionsfun.addOptionValueWithKeyBoard(event);
            createLi();
        }
    },[dispatch, formList])

    const removeOption = useCallback((id:number) => {
        optionsfun.removeOption(id);
        delelteLi();
    },[dispatch, formList])
    const handleChange = useCallback((event: SelectChangeEvent) => {
        const modOption = optionList.map((i) => {
            if (i.id.toString() == event.target.value) {
                return {...i, selected : true}
            }else return {...i, selected : false}
        })
        optionsfun.saveModOption(modOption);
        setOptionList(modOption);
        setAnswer(event.target.value);
        submitText(event.target.value);
    },[dispatch, formList])
    const submitText = (num : string) => {
        const targetIDX = optionList.findIndex((i) => i.id.toString() == num);
        const ret = optionList[targetIDX]?.value;
        setAnswerValue(ret);
    }
    return(
        <FlexTopColumn>
            {value==='write' ?
            optionList?.map((item, idx) => (
                <FlexLeftRow justifyContent={'space-between'}>
                    <FlexLeftRow>
                        <Typography sx={{padding: '9px 9px 9px 0'}}>{idx +1}</Typography>
                        { info.activated ?
                            <Input value={item.value}
                                   sx={{margin: '9px 0', width:  600}}
                                   id={item.id}
                                   onChange={(e:ChangeEvent<HTMLInputElement>) => optionsfun.handleTextChange(e, item.id)}
                            />
                            :<Typography>{item.value}</Typography>
                        }
                    </FlexLeftRow>
                    {/*해당 질문 클릭시에만 표시됨*/}
                    { info.activated && optionList.length >1 &&
                        <Tooltip title="삭제">
                            <IconButton arai-label="clear" onClick={() => removeOption(item.id)}>
                                <ClearIcon />
                            </IconButton>
                        </Tooltip>
                    }
                </FlexLeftRow>
            ))
            : value==='preview' ?
                <Select value={answer}
                      onChange={handleChange}
                      sx={{width :176}}
                      inputProps={{ 'aria-label': 'Without label' }}
                >
                    <MenuItem value={""} disabled>선택</MenuItem>
                    <Divider />
                    {optionList.map((i) =>
                    <MenuItem value={i.id}> {i.value}</MenuItem>)}
                </Select>
            : <Typography>{answerValue}</Typography>
            }
            {/*해당 질문 클릭시에만 표시됨*/}
            {value==='write' && info.activated &&
                <FlexLeftRow paddingLeft={0}>
                    {/*padding: 9px 9px 9px 0, width: 24*/}
                    <Typography sx={{padding: '9px 9px 9px 0'}}>{optionsfun.calMaxNum(optionList) + 1}</Typography>
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
                    </FlexLeftRow>
                </FlexLeftRow>
            }
        </FlexTopColumn>
    )
}