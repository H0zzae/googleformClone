import React, {useCallback} from "react"
import { MenuItem, Select, SelectChangeEvent, Typography} from "@mui/material";
import ShortTextIcon from '@mui/icons-material/ShortText';
import SubjectIcon from '@mui/icons-material/Subject';
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked';
import CheckBoxOutlinedIcon from '@mui/icons-material/CheckBoxOutlined';
import ArrowDropDownCircleOutlinedIcon from '@mui/icons-material/ArrowDropDownCircleOutlined';
import {FlexLeftRow} from "./ComponentStyle";
import Divider from "@mui/material/Divider";
import {useAppDispatch, useAppSelector} from "../research/config";
import {setForm} from "../research/slices/formSlice";

const AnswerType = [{id: 0, name : '단답형', description : 'shortAnswer'},
    {id: 1, name : '장문형', description : 'longAnswer'},
    {name: 'divider'},
    {id: 2, name : '객관식 질문', description : 'multipleChoice'},
    {id: 3, name : '체크박스', description : 'checkBox'},
    {id: 4, name : '드롭다운', description : 'dropDown'},
    ]

interface selectedType{
    id : number;
    type ?:string
}

export const AnswerTypeSelect =(info : selectedType) => {
    const {formList} = useAppSelector(state => state.form);
    const dispatch = useAppDispatch();


    const handleChange = useCallback((event: SelectChangeEvent) => {
        const modForm = formList.map((i) => {
            if (i.id === info.id){
                if ((!event.target.value.includes('Answer') && (i?.options === undefined)) || (i?.options?.length===0)){
                    return { ...i, type : event.target.value, options : [{id : 0, value:'옵션 1', selected : false}]}
                }
                return {...i, type: event.target.value}
            }
            else return {...i}
        })
        dispatch(setForm(modForm))
    },[dispatch, formList, info.id]);

    return(
        <Select
            labelId="demo-simple-select-helper-label"
            id="demo-simple-select-helper"
            value={info.type}
            onChange={handleChange}
            sx={{width : 208}}
        >
            {AnswerType.map((i, idx) => (
                idx===2 ?
                    <Divider />
                    :
                    <MenuItem value={i.description}>
                        <FlexLeftRow paddingTop={8} paddingBottom={8} paddingLeft={12} gap={12}>
                            {i.description === 'shortAnswer' ? <ShortTextIcon />
                            : i.description === 'longAnswer' ? <SubjectIcon />
                            : i.description ==='multipleChoice' ? <RadioButtonCheckedIcon />
                            : i.description ==='checkBox' ? <CheckBoxOutlinedIcon />
                            : <ArrowDropDownCircleOutlinedIcon />
                            }
                            <Typography variant='body1'>{i.name}</Typography>
                        </FlexLeftRow>
                    </MenuItem>
            ))}
        </Select>
    )
}