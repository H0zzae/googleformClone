import React, {useState} from "react";
import {TextInputBox, ResearchBox} from "../../compoents";
import * as style from "../../compoents/ComponentStyle";
import {FormSection} from "./formStyle";

const Form = () =>{
    const [itemList, setItemList] = useState<any[]>([{sort : 1, title : "one", id : 0, type : "text"}, {sort:2, title : "two", id : 1, type : "text"}]);

    // 브라우저 상에 보여지는 데이터 리스트
    const dragList = (record: any, id: number) => (

        <ResearchBox title={record.title} id={id}/>
        // 여기서 record는 dataSource로 itemList이다.
        // <div key={index}>
        //     <TextInputBox />
        //     <div>{record.sort}</div>
        //     <div>{record.name}</div>
        //     {/*<div>*/}
        //     {/*    <AiOutlineMenu />*/}
        //     {/*</div>*/}
        //     {/*<button onClick={() => modalHandler(record)}>변경</button>*/}
        //     {/*<button onClick={() => deleteItemAlert(record.id, record.name, index)}>*/}
        //     {/*    삭제*/}
        //     {/*</button>*/}
        // </div>
    );
    return(
        <FormSection>
            <style.GroupBox
                dataSource={itemList}//렌더링할 데이터 레코드 배열
                rowKey='id'//렌더링할 행 키
                row={dragList}  //렌더링할 행 데이터
                handles={false} //드래그 핸들 표시
                className='simple-drag'
                rowClassName='simple-drag-row'
                // onUpdate={handleUpdate} //정렬 목록이 변경될 때 호출됨
            />
            <TextInputBox title = "hi"/>
        </FormSection>
    )
}
export default Form;