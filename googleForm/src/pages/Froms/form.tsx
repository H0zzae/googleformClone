import React, {useCallback, useEffect, useState} from "react";
import {MenuBar, ResearchBox, ShortAnswerType, SubmitSection, TitleSection} from "../../compoents";
import * as style from "../../compoents/ComponentStyle";
import {FormSection} from "./formStyle";
import {DragList} from "../../compoents/ComponentStyle";
import {useAppDispatch, useAppSelector} from "../../research/config";
import {setForm} from "../../research/slices/formSlice";
import {Button} from "@mui/material";

interface FormItem {
    id: number,
    // order : number,
    title?: string,
    detail ?: string,
    type : string,
    subject ?:string,
    options ?: any[], //{id : 0, value:'옵션 1', selected : false}
    activated : boolean,
    necessary : boolean,
}
const Form = () =>{
    const {formList} = useAppSelector(state => state.form);
    const [formTitle, setFormTitle] = useState('');
    const {value} = useAppSelector(state => state.user);
    const dispatch = useAppDispatch();
    const [dragList, setDragList] = useState<FormItem[]>(formList);
    useEffect(() => {
        console.log("formList\n", formList);
        setDragList([...formList]);
    }, [formList]);

    const handleUpdate = useCallback((evt: any, updated: any) => {
        console.log(evt); // tslint:disable-line
        console.log(updated); // tslint:disable-line
        dispatch(setForm(updated))
    },[dispatch, formList])

    // 브라우저 상에 보여지는 데이터 리스트
    const dragListRow = (record: any, id: number) => (
        <ResearchBox id={id} type={record.type} disable={value!=='write'} checked={record.necessary} activated={record.activated}/>
        // 여기서 record는 dataSource
    );
    return(
        <FormSection>
            <MenuBar />
            <TitleSection edit={value!=='write'}/>
            <style.DragList
                dataSource={dragList}//렌더링할 데이터 레코드 배열
                rowKey='id'//렌더링할 행 키
                row={dragListRow}  //렌더링할 행 데이터
                handles={false} //드래그 핸들 표시
                className='simple-drag'
                rowClassName='simple-drag-row'
                onUpdate={handleUpdate} //정렬 목록이 변경될 때 호출됨
            />
            {value!=='write' &&
                <SubmitSection />
            }
        </FormSection>
    )
}
export default Form;