import React, {useCallback, useEffect, useState} from "react";
import {MenuBar, ResearchBox, SubmitSection, TitleSection} from "../../components";
import * as style from "../../components/ComponentStyle";
import {FormSection} from "./formStyle";
import {useAppDispatch, useAppSelector} from "../../research/config";
import {setForm, FormItem} from "../../research/slices/formSlice";


const Form = () =>{
    const {formList} = useAppSelector(state => state.form);
    const {value} = useAppSelector(state => state.user);
    const dispatch = useAppDispatch();
    const [dragList, setDragList] = useState<FormItem[]>(formList);
    useEffect(() => {
        console.log("formList\n", formList);
        setDragList([...formList]);
    }, [formList, dispatch]);

    useEffect(() => {
        // console.log("dragList : ", dragList);
    }, [dragList]);

    const handleUpdate = useCallback((evt: any, updated: any) => {
        //console.log(evt); // tslint:disable-line
        //console.log("updated: \n",updated); // tslint:disable-line
        const orderList = [...updated].map((item, idx) => {
            return {...item, order: idx}
        });
        setDragList(orderList);
        dispatch(setForm(orderList));
    },[dispatch])

    // 브라우저 상에 보여지는 데이터 리스트
    const dragListRow = (record: any, index: number) => (
        <ResearchBox key={index} id={record.id} type={record.type} disable={value!=='write'} checked={record.necessary} activated={record.activated}/>
        // 여기서 record는 dataSource
    );
    return(
        <FormSection>
            <MenuBar />
            <TitleSection edit={value!=='write'}/>
            <style.DragList
                dataSource={dragList}//렌더링할 데이터 레코드 배열
                rowKey='order'//렌더링할 행 키
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