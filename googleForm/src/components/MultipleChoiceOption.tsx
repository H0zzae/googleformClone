import React, {ChangeEvent, KeyboardEvent, useCallback, useEffect, useState} from "react"
import {FlexLeftRow} from "./ComponentStyle";
import {
    Button,
    FormControl,
    IconButton,
    Input,
    Radio,
    RadioGroup,
    TextField,
    Typography
} from "@mui/material";
import ImageOutlinedIcon from "@mui/icons-material/ImageOutlined";
import ClearIcon from '@mui/icons-material/Clear';
import Tooltip from "@mui/material/Tooltip";
import {useAppDispatch, useAppSelector} from "../research/config";
import OptionsHooks, {optionInfo} from "./optionsHooks";

export const MultipleChoiceOption = (info : optionInfo) => {
    const {formList} = useAppSelector(state => state.form);
    const {value} = useAppSelector(state => state.user);
    const dispatch = useAppDispatch();
    const [newInputText, setNewInputText] = useState<string>();
    const [checkedValue, setCheckedValue] = useState<string>('undefined');
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

    const addETC = useCallback(() => {
        const prevOption = optionsfun.currentOption();
        const newID = (!optionList.length) ? 0 : Math.max(...optionList.map((item) => item.id)) + 1; //맨 마지막에 위치하게끔..수정필요
        const modOption = prevOption?.concat([{id: newID, value: '기타', selected : false}]);
        // console.log(modOption);
    },[dispatch, formList]);
    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setCheckedValue((event.target as HTMLInputElement).value);
        const modOption = optionList.map((i) => {
            if (i.id.toString() == event.target.id) {
                return {...i, selected : !(i.selected)}
            }else return {...i, selected : false}
        });
        optionsfun.saveModOption(modOption);
    };

    const controlProps = (item : any) => ({
        id : item?.id,
        checked : item?.selected,
        onChange : handleChange,
        value : item?.value,
        inputProps : {'aria-label' : item?.value},
    })

    return (
        <FormControl>
            <RadioGroup
                aria-labelledby="demo-controlled-radio-buttons-group"
                name="controlled-radio-buttons-group"
                value={checkedValue}
                onChange={handleChange}
            >
                {optionList?.map((item) => (
                    <FlexLeftRow  justifyContent={'space-between'}>
                        <FlexLeftRow>
                            <Radio {...controlProps(item)} disabled={value==='write'} />
                            {value==='write' && info.activated?
                                <Input //defaultValue={defaultText + (optionList.length + 1).toString()}
                                   value={item?.value}
                                   sx={{margin: '9px 0', width:  600}}
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
                        {optionList.length>1 && info.activated && value==='write' &&
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
                        <Radio disabled value={'justIcon'}/>
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
                            <Button variant={"text"} size={"small"} sx={{color: "#1976d2"}} onClick={addETC}>'기타' 추가</Button>
                        </FlexLeftRow>
                    </FlexLeftRow>
                }
            </RadioGroup>
        </FormControl>
    )
}