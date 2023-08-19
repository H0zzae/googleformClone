import React, {ChangeEvent, KeyboardEvent, useEffect, useState} from "react"
import {FlexLeftRow, FlexTopColumn} from "./ComponentStyle";
import {
    Button,
    Checkbox,
    IconButton,
    Input, TextField,
    Typography
} from "@mui/material";
import ImageOutlinedIcon from "@mui/icons-material/ImageOutlined";
import ClearIcon from '@mui/icons-material/Clear';
import Tooltip from "@mui/material/Tooltip";
import {useAppDispatch, useAppSelector} from "../research/config";
import OptionsHooks, {optionInfo} from "./optionsHooks";


export const CheckBoxOption = (info:optionInfo) => {
    const {formList} = useAppSelector(state => state.form);
    const {value} = useAppSelector(state => state.user);
    const dispatch = useAppDispatch();
    const [newInputText, setNewInputText] = useState<string>();
    const [optionList, setOptionList] = useState<any[]>([]);
    const optionsfun = OptionsHooks(info.id);

    useEffect(() => {
        console.log(optionsfun.currentOption());
        setOptionList(optionsfun.currentOption())
        setNewInputText('');
    }, [formList, dispatch]);

    useEffect(() => {
        console.log("value : ", value);
        optionsfun.resetOptionSelected();
    }, [value]);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        console.log("prev : \n", optionList);
        const modOption = optionList.map((i) => {
            if (i.id == event.target.id) {
                return {...i, selected : !(i.selected)}
            }else return i
        })
        optionsfun.saveModOption(modOption)
        console.log("after : \n" , optionList);
    };


    return (
        <FlexTopColumn>
            {optionList?.map((item) => (
                <FlexLeftRow  justifyContent={'space-between'}>
                    <FlexLeftRow>
                        <Checkbox onChange={handleChange} checked={item.selected} disabled={value==='write'} id={item.id} />
                        {value==='write' && info.activated ?
                            <Input value={item.value}
                                   sx={{margin: '9px 0', width:  600}}
                                   id={item.id}
                                   onChange={(e:ChangeEvent<HTMLInputElement>) => optionsfun.handleTextChange(e, item.id)}
                            />
                            : <Typography>{item.value}</Typography>
                        }
                        {/*hover시 표시됨*/}
                    </FlexLeftRow>
                    {value==='write' && info.activated &&
                        <Tooltip title="이미지 추가">
                            <ImageOutlinedIcon sx={{fontSize: 24}} />
                        </Tooltip>
                    }
                    {/*해당 질문 클릭시에만 표시됨*/}
                    {value==='write' && info.activated && optionList.length>1 &&
                        <Tooltip title="삭제">
                            <IconButton arai-label="clear" onClick={() => optionsfun.removeOption(item.id)}>
                                <ClearIcon />
                            </IconButton>
                        </Tooltip>
                    }
                </FlexLeftRow>
            ))}
            {/*해당 질문 클릭시에만 표시됨*/}
            {value==='write' && info.activated &&
                <FlexLeftRow paddingLeft={0}>
                    <Checkbox disabled />
                    <FlexLeftRow gap={8}>
                        <TextField placeholder={"옵션 추가"} sx={{width: 52 }}
                                   variant="standard"
                                   value={newInputText}
                                   onChange={(event : ChangeEvent<HTMLInputElement>) => setNewInputText(event.target.value)}
                                   onBlur ={optionsfun.addOptionValue}
                                   InputProps={{
                                       onKeyDown:(event:KeyboardEvent<HTMLInputElement>) => {optionsfun.addOptionValueWithKeyBoard(event)}
                                   }}
                        />
                        <Typography variant={"body1"}> 또는 </Typography>
                        <Button variant={"text"} size={"small"} sx={{color: "#1976d2"}}>'기타' 추가</Button>
                    </FlexLeftRow>
                </FlexLeftRow>
            }
        </FlexTopColumn>
    )
}