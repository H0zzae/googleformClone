import React, {useState} from "react"
import {FlexLeftRow} from "./ComponentStyle";
import {Button, FormControl, FormControlLabel, IconButton, Input, Radio, RadioGroup, Typography} from "@mui/material";
import {ShortAnswerInputBox} from "./ShortAnswerInputBox";
import ImageOutlinedIcon from "@mui/icons-material/ImageOutlined";
import ClearIcon from '@mui/icons-material/Clear';
import Tooltip from "@mui/material/Tooltip";

export const MultipleChoiceOption = () => {
    const [value, setValue] = useState('');
    const [optionList, setOptionList] = useState<string[]>([]);
    const defaultText = "옵션 "

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValue((event.target as HTMLInputElement).value);
    };

    const controlProps = (item : string) => ({
        checked : value ===item,
        onChange : handleChange,
        value : item,
        inputProps : {'aria-label' : item},
    })

    return (
        <FormControl>
            <RadioGroup
                aria-labelledby="demo-controlled-radio-buttons-group"
                name="controlled-radio-buttons-group"
                value={value}
                onChange={handleChange}
            >
                <FlexLeftRow  justifyContent={'space-between'}>
                    <FlexLeftRow>
                        <Radio {...controlProps(defaultText + (optionList.length + 1).toString())} disabled />
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
                    <Radio disabled />
                    <FlexLeftRow gap={8}>
                        <Input placeholder={"옵션 추가"} sx={{width: 52 }}/>
                        <Typography variant={"body1"}> 또는 </Typography>
                        <Button variant={"text"} size={"small"} sx={{color: "#1976d2"}}>'기타' 추가</Button>
                    </FlexLeftRow>
                </FlexLeftRow>
            </RadioGroup>
        </FormControl>
    )
}