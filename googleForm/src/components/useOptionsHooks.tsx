import React, {ChangeEvent, FocusEvent, KeyboardEvent, useCallback, useState} from "react";
import {useAppDispatch, useAppSelector} from "../research/config";
import {setForm} from "../research/slices/formSlice";
export interface optionInfo {
    id : number;
    type ?: string;
    activated : boolean;
}
const useOptionsHooks = (id : number) => {
    const {formList} = useAppSelector(state => state.form);
    const dispatch = useAppDispatch();
    const [optionList, setOptionList] = useState<any[]>([]);
    const defaultText = "옵션 "

    const loadFormList = () => {
        return [...formList]
    }

    const currentTargetItem = () => {
        const targetIdx = formList.findIndex((i) => i.id ===id)
        const targetForm = formList[targetIdx];
        return [targetForm];
    }

    const currentOption = () => {
        const targetIdx = formList.findIndex((i) => i.id ===id)
        const targetForm = formList[targetIdx];
        const prevOption = targetForm?.options;
        return prevOption || [];
    }
    const calMaxNum = (list:any[]) => {
        const maxNum = (!list.length) ? 0 : Math.max(...list.map((item) => item.id)) + 1
        return maxNum;
    }
    const createDefaultText = (num:number) => {
        return defaultText + num
    }
    const saveModOption = (changed:any[]) => {
        const modForm = formList.map((i) => {
            if (i.id ===id) {
                return {...i, options : changed}
            }else return i
        })
        dispatch(setForm(modForm));
        setOptionList(changed);
    }

    const handleTextChange = useCallback((event : ChangeEvent<HTMLInputElement>, targetID:number) => {
        const modOption = optionList?.map((i) => {
            if (i?.id === targetID) {
                return {...i, value: event.target.value}
            } else return i
        });
        saveModOption(modOption);
    },[dispatch, formList]);


    const addOptionValue = useCallback((event : FocusEvent<HTMLInputElement>) => {
        const prevOption = currentOption();
        const newID = calMaxNum(prevOption);
        const textValue = event.currentTarget.value ==='' ? createDefaultText(newID +1) : event.currentTarget.value;
        const modOption = prevOption?.concat([{id: newID, value: textValue, selected: false}]);
        saveModOption(modOption);
    },[dispatch, formList])

    const addOptionValueWithKeyBoard = useCallback((event:KeyboardEvent<HTMLInputElement>) => {
        if (event.key ==='Enter') {
            const prevOption = currentOption();
            const newID = calMaxNum(prevOption);
            const textValue = event.currentTarget.value ==='' ? createDefaultText(newID +1) : event.currentTarget.value;
            const modOption = prevOption.concat([{id : newID, value : textValue, selected : false}]);
            saveModOption(modOption);
        }
    },[dispatch, formList])

    const removeOption = useCallback((targetID:number) => {
        const copyForm = [...currentOption()];
        const removeIndx = copyForm?.findIndex(item => item.id ===targetID);
        if (removeIndx!==undefined) {
            copyForm?.splice(removeIndx, 1);
            saveModOption(copyForm);
        }
    },[dispatch, formList])

    const resetOptionSelected = useCallback(()  => {
        const prevOption = currentOption();
        const changed = prevOption.map((i) => {return {...i, selected : false}})
        saveModOption(changed);
    },[dispatch, formList])

    const addETC = useCallback(() => {
        const prevForm = loadFormList();
        const changed = prevForm.map((i) => {
            if (i.id === id) {
                return {...i, etc : true};
            }else return i
        })
        dispatch(setForm(changed));
    },[dispatch, formList]);

    const removeETC = useCallback(() => {
        const prevForm = loadFormList();
        const changed = prevForm.map((i) => {
            if (i.id === id) {
                return {...i, etc : false};
            }else return i
        })
        dispatch(setForm(changed));
    },[dispatch, formList])
    return {calMaxNum,
        currentOption,
        saveModOption,
        handleTextChange,
        addOptionValue,
        addOptionValueWithKeyBoard,
        removeOption,
        resetOptionSelected,
        loadFormList,
        currentTargetItem,
        addETC,
        removeETC
    }
}
export default useOptionsHooks;
