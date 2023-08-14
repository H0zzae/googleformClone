import React, {ChangeEvent, FocusEventHandler, useCallback, useState} from "react";
import {ResearchBottomSection} from "./ResearchBottomSection";
import {OptionType} from "./OptionType";
import {ShortAnswerType} from "./ShortAnswerType";
import {LongAnswerType} from "./LongAnswerType";
import {FlexLeftRow, RedText,ResearchDiv, BlueBox} from "./ComponentStyle";
import ImageOutlinedIcon from "@mui/icons-material/ImageOutlined";
import {AnswerTypeSelect} from "./AnswerTypeSelect";
import {CheckBoxType} from "./CheckBoxType";
import {DropDownType} from "./DropDownType";
import {useAppDispatch, useAppSelector} from "../research/config";
import {setForm} from "../research/slices/formSlice";
import {TextField, Typography} from "@mui/material";

export interface ResearchBoxInfo {
    id : number;
    title ?: string;
    type ?: string;
    disable : boolean;
    checked : boolean;
    activated : boolean;
}


export const ResearchBox = (researchBoxInfo:ResearchBoxInfo)=> {
    const {formList} = useAppSelector(state => state.form);
    const {value} = useAppSelector(state => state.user);
    const dispatch = useAppDispatch();

    const formItem = formList.map((i) => {if (i.id === researchBoxInfo.id) return i})[0];

    const [itemTitle, setTitle] = useState<string>(researchBoxInfo.title || '이름');

    const onChangeTitle = useCallback((event:ChangeEvent<HTMLInputElement>) => {
        setTitle(event.target.value);
        const modForm = formList.map((i) => {
            if (i.id === researchBoxInfo.id){
                return {...i, title : event.target.value}
            }else return i
        })
        dispatch(setForm(modForm));
    },[dispatch, formList]);
    const handleFocusEvent = useCallback((e:any) => {
        const targetForm = formList.findIndex((i) => i.id === researchBoxInfo.id);
        if (!formList[targetForm].activated && !researchBoxInfo.disable) {
            const modForm = formList.map((i) => {
                if (i.id === researchBoxInfo.id) {
                    return {...i, activated: true}
                } else return {...i, activated: false}
            })
            modForm !== formList && dispatch(setForm(modForm));
        }
    },[dispatch, formList])

    return (
        <ResearchDiv onClick={handleFocusEvent} activated={researchBoxInfo.activated}>
            {!researchBoxInfo.disable && researchBoxInfo.activated && <BlueBox/>}
            {!researchBoxInfo.disable && researchBoxInfo.activated?
                <FlexLeftRow justifyContent={'space-between'} gap={8}>
                    <FlexLeftRow justifyContent={'space-between'}>
                        <TextField
                            hiddenLabel
                            id="filled-hidden-label-normal"
                            value={itemTitle}
                            variant="filled"
                            sx={{width : 446, padding : 0}}
                            onChange={onChangeTitle}
                        />

                    </FlexLeftRow>
                    <ImageOutlinedIcon sx={{fontSize: 24}} onClick ={() => console.log(formItem)}/>
                    <AnswerTypeSelect id={researchBoxInfo.id} type={researchBoxInfo.type}/>
                </FlexLeftRow>
            :
                <>
                    <Typography variant="body1" sx={{fontSize: '16px', fontWeight : 400, marginBottom: '16px', whiteSpace : 'nowrap', display : "inline"}}>{itemTitle}</Typography>
                    {researchBoxInfo.checked && <RedText sx={{display : "inline"}}> *</RedText>}
                </>
            }
            {researchBoxInfo.type ==="shortAnswer"?
                <ShortAnswerType disable={researchBoxInfo.disable}/>
            :researchBoxInfo.type ==='longAnswer' ?
                <LongAnswerType  disable={researchBoxInfo.disable}/>
            :researchBoxInfo.type ==='multipleChoice'?
                <OptionType />
                // <OptionType  disable={researchBoxInfo.disable}/>
            :researchBoxInfo.type === 'checkBox' ?
                <CheckBoxType />
                // <CheckBoxType  disable={researchBoxInfo.disable}/>
            : <DropDownType />
            // : <DropDownType  disable={researchBoxInfo.disable}/>
            }

            {!researchBoxInfo.disable && researchBoxInfo.activated &&
            <ResearchBottomSection id={researchBoxInfo.id} checked={researchBoxInfo.checked}/>
            }
        </ResearchDiv>
    )
}