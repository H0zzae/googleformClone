import React from "react"
import {FlexLeftRow, FlexTopColumn} from "./ComponentStyle";
import {ShortAnswerInputBox} from "./ShortAnswerInputBox";
interface shortAnswerInfo {
    text ?: string;
    type ?: string;
}

export const ShortAnswerType = (sainfo:shortAnswerInfo) => {
    return (
    <>
        <FlexTopColumn>
            <FlexLeftRow>
                <ShortAnswerInputBox  text={sainfo.text}/>
            </FlexLeftRow>
        </FlexTopColumn>
    </>
    )
}