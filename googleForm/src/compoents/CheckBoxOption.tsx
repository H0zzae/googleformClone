import React, {useState} from "react"
import {FlexLeftRow, FlexTopColumn} from "./ComponentStyle";
import {
    Button,
    Checkbox,
    IconButton,
    Input,
    Typography
} from "@mui/material";
import {ShortAnswerInputBox} from "./ShortAnswerInputBox";
import ImageOutlinedIcon from "@mui/icons-material/ImageOutlined";
import ClearIcon from '@mui/icons-material/Clear';
import Tooltip from "@mui/material/Tooltip";

export const CheckBoxOption = () => {
    const [checked, setChecked] = useState<boolean[]>([false]);
    const [optionList, setOptionList] = useState<string[]>([]);
    const defaultText = "옵션 "

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setChecked([event.target.checked]);
        // setChecked(checked => [...checked, event.target.checked]);
    };

    const label = (item : string) => ({
        onChange : handleChange,
        inputProps: { 'aria-label': item}
    });

    return (
        <FlexTopColumn>
            <FlexLeftRow  justifyContent={'space-between'}>
                <FlexLeftRow>
                    <Checkbox {...label} checked={checked[0]} disabled />
                    <ShortAnswerInputBox  text={defaultText + (optionList.length + 1).toString()} activate={true} fullWidth={true}/>
                    {/*hover시 표시됨*/}
                </FlexLeftRow>
                <Tooltip title="이미지 추가">
                    <ImageOutlinedIcon sx={{fontSize: 24}} />
                </Tooltip>
                {/*해당 질문 클릭시에만 표시됨*/}
                <Tooltip title="삭제">
                    <IconButton arai-label="clear">
                        <ClearIcon />
                    </IconButton>
                </Tooltip>
            </FlexLeftRow>
            {/*해당 질문 클릭시에만 표시됨*/}
            <FlexLeftRow paddingLeft={0}>
                <Checkbox disabled />
                <FlexLeftRow gap={8}>
                    <Input placeholder={"옵션 추가"} sx={{width: 52 }}/>
                    <Typography variant={"body1"}> 또는 </Typography>
                    <Button variant={"text"} size={"small"} sx={{color: "#1976d2"}}>'기타' 추가</Button>
                </FlexLeftRow>
            </FlexLeftRow>
        </FlexTopColumn>
    )
}