import React, {useState} from "react"
import {FlexLeftRow, FlexTopColumn} from "./ComponentStyle";
import {Button, Checkbox, IconButton, Input, Typography} from "@mui/material";
import {ShortAnswerInputBox} from "./ShortAnswerInputBox";
import Tooltip from "@mui/material/Tooltip";
import ImageOutlinedIcon from "@mui/icons-material/ImageOutlined";
import ClearIcon from "@mui/icons-material/Clear";

export const DropDownOption = () => {
    const [count, setCount] = useState<number>(1);
    const [optionList, setOptionList] = useState<string[]>([]);
    const createLi = () =>{
        setCount(count+1);
    }
    const delelteLi = () =>{
        setCount(count-1);
    }
    const defaultText = "옵션 "

    return(
        <FlexTopColumn>
            <FlexLeftRow justifyContent={'space-between'}>
                <FlexLeftRow>
                    <Typography sx={{padding: '9px 9px 9px 0'}}>{count}</Typography>
                    <ShortAnswerInputBox  text={defaultText + (optionList.length + 1).toString()} activate={true} fullWidth={true}/>
                </FlexLeftRow>
                {/*해당 질문 클릭시에만 표시됨*/}
                <Tooltip title="삭제">
                    <IconButton arai-label="clear">
                        <ClearIcon />
                    </IconButton>
                </Tooltip>
            </FlexLeftRow>
            {/*해당 질문 클릭시에만 표시됨*/}
            <FlexLeftRow paddingLeft={0}>
                {/*padding: 9px 9px 9px 0, width: 24*/}
                <Typography sx={{padding: '9px 9px 9px 0'}}>{count+1}</Typography>
                <FlexLeftRow gap={8}>
                    <Input placeholder={"옵션 추가"} sx={{width: 52 }}/>
                    <Typography variant={"body1"}> 또는 </Typography>
                    <Button variant={"text"} size={"small"} sx={{color: "#1976d2"}}>'기타' 추가</Button>
                </FlexLeftRow>
            </FlexLeftRow>
        </FlexTopColumn>
    )
}