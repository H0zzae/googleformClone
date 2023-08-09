import React from "react"
import {FlexLeftRow, FlexTopColumn} from "./ComponentStyle";
import {TextInputBox} from "./TextInputBox";
import ImageOutlinedIcon from "@mui/icons-material/ImageOutlined";
import {AnswerTypeSelect} from "./AnswerTypeSelect";
import {LongAnswerInputBox} from "./LongAnswerInputBox";

interface longAnswerInfo {
    text ?: string;
    type ?: string;
}

export const LongAnswerType = (lainfo : longAnswerInfo) => {
    return (
        <>
            <FlexTopColumn paddingLeft={24} paddingRight={24}>
                <FlexLeftRow justifyContent={'space-between'} gap={8}>
                    <TextInputBox title={lainfo.text}/>
                    <ImageOutlinedIcon sx={{fontSize: 24}}/>
                    <AnswerTypeSelect type={lainfo.type}/>
                </FlexLeftRow>
                <FlexLeftRow>
                    <LongAnswerInputBox  text={lainfo.text}/>
                </FlexLeftRow>
            </FlexTopColumn>
        </>
    )
}
