import React from "react"
import {FlexTopColumn} from "./ComponentStyle";
import {MultipleChoiceOption} from "./MultipleChoiceOption";

interface optionTypeinfo {
    title?: string;
    type ?:string;
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