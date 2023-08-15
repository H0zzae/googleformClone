import React, {ChangeEvent, FocusEvent, ChangeEventHandler, KeyboardEvent, useCallback, useEffect, useState} from "react"
import {FlexLeftRow} from "./ComponentStyle";
import {
    Button,
    FormControl,
    FormControlLabel,
    IconButton,
    Input,
    Radio,
    RadioGroup,
    TextField,
    Typography
} from "@mui/material";
import {ShortAnswerInputBox} from "./ShortAnswerInputBox";
import ImageOutlinedIcon from "@mui/icons-material/ImageOutlined";
import ClearIcon from '@mui/icons-material/Clear';
import Tooltip from "@mui/material/Tooltip";
import {useAppDispatch, useAppSelector} from "../research/config";
import {setForm} from "../research/slices/formSlice";
import form from "../pages/Froms/form";

interface optionInfo {
    id : number;
    type ?: string;
}

export const MultipleChoiceOption = (info : optionInfo) => {
    const {formList} = useAppSelector(state => state.form);
    const {value} = useAppSelector(state => state.user);
    const dispatch = useAppDispatch();
    const [newInputText, setNewInputText] = useState<string>();
    const [checkedValue, setCheckedValue] = useState<string>('undefined');
    const [optionList, setOptionList] = useState<any[]>([]);
    const defaultText = "옵션 "

    useEffect(() => {
        setOptionList(formList[info.id].options || []);
    }, [formList, dispatch]);
    useEffect(() => {
        setCheckedValue('undefined');
        const initial = optionList.map((i) => {
            return {...i, selected:false}
        })
        saveModOption(initial)
    }, [value]);
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
        const targetForm = formList[info.id];
        const modOption = targetForm.options?.map((i) => {
            if (i?.id === id) {
                return {...i, value: event.target.value}
            } else return i
        });
        const modForm = formList.map((i) => {
            if (i.id === info.id) {
                return {...i, options: modOption}
            } else return i
        })
        dispatch(setForm(modForm));
    },[dispatch, formList]);

    const addETC = useCallback(() => {
        const targetForm = formList[info.id];
        const newID = targetForm?.options?.length; //맨 마지막에 위치하게끔..수정필요
        const modOption = targetForm?.options?.concat([{id: newID, value: '기타', selected : false}]);
        // console.log(modOption);
    },[dispatch, formList]);
    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setCheckedValue((event.target as HTMLInputElement).value);
        const modOption = optionList.map((i) => {
            if (i.id == event.target.id) {
                return {...i, selected : !(i.selected)}
            }else return {...i, selected : false}
        });
        saveModOption(modOption);
    };

    const addOptionValue = useCallback((event : FocusEvent<HTMLInputElement>) => {
        if (newInputText !=='') {
            const targetForm = formList[info.id];
            const newID = targetForm?.options?.length;
            const modOption = targetForm?.options?.concat([{id: newID, value: event.target.value, selected: false}]);
            saveModOption(modOption || []);
            setNewInputText('');
        }
    },[dispatch, formList])

    const addOptionValueWithKeyBoard = useCallback((event:KeyboardEvent<HTMLInputElement>) => {
        if (event.key ==='Enter') {
            const NewID = optionList.length;
            const textValue = event.currentTarget.value ==='' ? defaultText + (NewID+1) : event.currentTarget.value;
            const modOption = optionList.concat([{id : NewID, value : textValue, selected : false}]);
            saveModOption(modOption);
            setNewInputText('')
        }
    },[dispatch, formList])
    const removeOption = useCallback((id:number) => {
        const copyForm = [...optionList];
        const removeIndx = copyForm?.findIndex(item => item.id ===id);
        if (removeIndx!==undefined) {
            copyForm?.splice(removeIndx, 1);
            saveModOption(copyForm || []);
        }
    },[dispatch, formList])
    const controlProps = (item : any) => ({
        id : item?.id,
        checked : item?.selected,
        onChange : handleChange,
        value : item?.value,
        inputProps : {'aria-label' : item?.value},
    })

    return (
        <FormControl>
            <RadioGroup
                aria-labelledby="demo-controlled-radio-buttons-group"
                name="controlled-radio-buttons-group"
                value={checkedValue}
                onChange={handleChange}
            >
                {optionList?.map((item) => (
                    <FlexLeftRow  justifyContent={'space-between'}>
                        <FlexLeftRow>
                            <Radio {...controlProps(item)} disabled={value==='write'} />
                            {value==='write' ?
                                <Input //defaultValue={defaultText + (optionList.length + 1).toString()}
                                   value={item?.value}
                                   sx={{margin: '9px 0', width:  600}}
                                   id={item?.id}
                                   onChange={(e:ChangeEvent<HTMLInputElement>) => handleTextChange(e, item.id)}
                                />
                            : <Typography>{item.value}</Typography>
                            }
                            {/*hover시 표시됨*/}
                        </FlexLeftRow>
                        {value==='write' &&
                            <Tooltip title="이미지 추가">
                                <ImageOutlinedIcon sx={{fontSize: 24}} />
                            </Tooltip>
                        }
                        {/*해당 질문 클릭시에만 표시됨*/}
                        {optionList.length>1 && value==='write' &&
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
                        <Radio disabled value={'justIcon'}/>
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
                            <Typography variant={"body1"}> 또는 </Typography>
                            <Button variant={"text"} size={"small"} sx={{color: "#1976d2"}} onClick={addETC}>'기타' 추가</Button>
                        </FlexLeftRow>
                    </FlexLeftRow>
                }
            </RadioGroup>
        </FormControl>
    )
}