import React from "react"
import {FlexTopColumn} from "./ComponentStyle";
import {CheckBoxOption} from "./CheckBoxOption";

interface CheckBoxTypeinfo {
    title?: string;
    type ?:string;
}
export const CheckBoxType = (cinfo:CheckBoxTypeinfo) => {

    return(
        <>
            <FlexTopColumn >
                <FlexTopColumn>
                    <CheckBoxOption />
                </FlexTopColumn>
            </FlexTopColumn>
        </>
    )
}