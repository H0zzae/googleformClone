import React from "react"
import {FlexLeftRow, FlexRightRow, FlexTopColumn} from "./ComponentStyle";
import {ShortAnswerInputBox} from "./ShortAnswerInputBox";
import {TextInputBox} from "./TextInputBox";
import ImageOutlinedIcon from '@mui/icons-material/ImageOutlined';
import {AnswerTypeSelect} from "./AnswerTypeSelect";
interface shortAnswerInfo {
    text ?: string;
    type ?: string;
}

export const ShortAnswerType = (sainfo:shortAnswerInfo) => {
    return (
    <>
        <FlexTopColumn paddingLeft={24} paddingRight={24}>
            <FlexLeftRow justifyContent={'space-between'} gap={8}>
                <TextInputBox title={sainfo.text}/>
                <ImageOutlinedIcon sx={{fontSize: 24}}/>
                <AnswerTypeSelect type={sainfo.type}/>
            </FlexLeftRow>
            <FlexLeftRow justifyContent={'space-between'}>
                <ShortAnswerInputBox  text={sainfo.text}/>
            </FlexLeftRow>
        </FlexTopColumn>
    </>
    )
}