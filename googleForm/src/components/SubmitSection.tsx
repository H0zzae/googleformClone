import React, {useCallback} from "react"
import {FlexLeftRow} from "./ComponentStyle";
import {Button} from "@mui/material";
import {useAppDispatch, useAppSelector} from "../research/config";
import {setForm} from "../research/slices/formSlice";
import {setVisible} from "../research/slices/userSlice";

export const SubmitSection = () => {
    const {formList} = useAppSelector(state => state.form);
    const {value} = useAppSelector(state => state.user);
    const dispatch = useAppDispatch();

    const changeValueToSubmit = useCallback(() => {
        alert('필수항목 다채워짐');
        dispatch(setVisible('submit'));
    },[dispatch])

    const notFullfilled = useCallback((list:number[]) => {
        console.log('필수항목 안채워짐');
        const prevForm = [...formList];
        const changed = prevForm.map((item) => {
            return list.includes(item.id) ? {...item, status : false} : {...item, status : true}
        })
        dispatch(setForm(changed));
    },[dispatch]);

    const submitAction = () => {
        let falseList:number[] = [];
        formList.forEach((i, idx) => {
            if (i.necessary) {
                if (i.type.includes('Answer')){
                    if (i.subject==undefined || (i.subject?.length <= 0)){
                        falseList.push(idx);
                    }
                }else if(i?.options) {
                    let check = false;
                    for(let item = 0;item<i.options.length;item ++){
                        if (i.options[item].selected){
                            console.log(idx, i.options[item])
                            check = true;
                        }
                    }
                    if (!check) {
                        falseList.push(idx);
                    }
                }
            }
        })
        console.log("falseList : ", falseList);
        (falseList.length ===0) ? changeValueToSubmit() : notFullfilled(falseList);
    }

    const removeAnswer = useCallback(() => {
        const prev = [...formList];
        const changed = prev.map((i) => {
            if (i.type.includes('Answer')){
                return {...i, subject : ''}
            }else {
                const prevOption = i.options;
                const resetSelect = prevOption?.map((option) => {return {...option, selected : false}});
                return {...i, options : resetSelect};
            }
        })
        dispatch(setForm(changed));
    },[dispatch])

    return(
        <>
            <FlexLeftRow justifyContent={'space-between'}>
                <Button variant={"contained"} sx={{padding: '6px 24px'}} onClick={submitAction}>제출</Button>
                <Button variant={"text"} onClick={removeAnswer}>양식 지우기</Button>
            </FlexLeftRow>
        </>
    )
}