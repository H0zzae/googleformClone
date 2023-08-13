import React from "react"
import {FlexTopColumn} from "./ComponentStyle";
import {MultipleChoiceOption} from "./MultipleChoiceOption";

interface optionTypeinfo {
    title?: string;
    type ?:string;
    // disable : boolean;
}
export const OptionType = (oinfo:optionTypeinfo) => {

    return(
        <>
            <FlexTopColumn >
                <FlexTopColumn>
                    <MultipleChoiceOption />
                </FlexTopColumn>
            </FlexTopColumn>
        </>
    )
}