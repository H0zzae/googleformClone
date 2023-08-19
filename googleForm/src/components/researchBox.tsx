import React, {ChangeEvent, useCallback, useState} from "react";
import {FlexLeftRow, RedText,ResearchDiv, BlueBox} from "./ComponentStyle";
import ImageOutlinedIcon from "@mui/icons-material/ImageOutlined";
import {useAppDispatch, useAppSelector} from "../research/config";
import {setForm} from "../research/slices/formSlice";
import {TextField, Typography} from "@mui/material";
import {ResearchBottomSection, OptionType, AnswerTypeSelect, TextAnswerType} from "./";

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
    const dispatch = useAppDispatch();
    const [itemTitle, setTitle] = useState<string>(researchBoxInfo.title || '이름');

    const onChangeTitle = useCallback((event:ChangeEvent<HTMLInputElement>) => {
        setTitle(event.target.value);
        const modForm = formList?.map((i) => {
            if (i.id === researchBoxInfo.id){
                return {...i, title : event.target.value}
            }else return i
        })
        dispatch(setForm(modForm));
    },[dispatch, formList]);
    const handleFocusEvent = useCallback((e:any) => {
        const targetForm = formList.findIndex((i) => i.id === researchBoxInfo.id);
        console.log(researchBoxInfo.id , formList[targetForm]);
        if (!formList[targetForm]?.activated && !researchBoxInfo.disable) {
            const modForm = formList.map((i) => {
                if (i.id === researchBoxInfo.id) {
                    return {...i, activated: true}
                } else return {...i, activated: false}
            })
            dispatch(setForm(modForm));
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
                    <ImageOutlinedIcon sx={{fontSize: 24}}/>
                    <AnswerTypeSelect id={researchBoxInfo.id} type={researchBoxInfo.type}/>
                </FlexLeftRow>
            :
                <>
                    <Typography variant="body1" sx={{fontSize: '16px', fontWeight : 400, marginBottom: '16px', whiteSpace : 'nowrap', display : "inline"}}>{itemTitle}</Typography>
                    {researchBoxInfo.checked && <RedText sx={{display : "inline"}}> *</RedText>}
                </>
            }
            {researchBoxInfo.type?.includes('Answer')?
                <TextAnswerType disable={researchBoxInfo.disable} id={researchBoxInfo.id} type={researchBoxInfo.type}/>
            :
                <OptionType type={researchBoxInfo.type} id={researchBoxInfo.id} activated={researchBoxInfo.activated}/>
            }

            {!researchBoxInfo.disable && researchBoxInfo.activated &&
            <ResearchBottomSection id={researchBoxInfo.id} checked={researchBoxInfo.checked}/>
            }
        </ResearchDiv>
    )
}