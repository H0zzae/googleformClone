import React from "react"
import {FlexLeftRow, FlexTopColumn} from "./ComponentStyle";
import {LongAnswerInputBox} from "./LongAnswerInputBox";

interface longAnswerInfo {
    text ?: string;
    type ?: string;
}

export const LongAnswerType = (lainfo : longAnswerInfo) => {
    return (
        <>
            <FlexTopColumn>
                <FlexLeftRow>
                    <LongAnswerInputBox  text={lainfo.text}/>
                </FlexLeftRow>
            </FlexTopColumn>
        </>
    )
}
