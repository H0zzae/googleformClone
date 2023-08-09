import React from "react"
import {FlexTopColumn} from "./ComponentStyle";
import {DropDownOption} from "./DropDownOption";

interface DropDownTypeinfo {
    title?: string;
    type ?:string;
}
export const DropDownType = (dinfo:DropDownTypeinfo) => {

    return(
        <>
            <FlexTopColumn >
                <FlexTopColumn>
                    <DropDownOption />
                </FlexTopColumn>
            </FlexTopColumn>
        </>
    )
}