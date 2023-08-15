import React from "react"
import {FlexTopColumn} from "./ComponentStyle";
import {MultipleChoiceOption} from "./MultipleChoiceOption";
import {CheckBoxOption} from "./CheckBoxOption";
import {DropDownOption} from "./DropDownOption";

interface optionTypeinfo {
    id: number;
    type ?:string;
    // disable : boolean;
}
export const OptionType = (oinfo:optionTypeinfo) => {

    return(
        <>
            <FlexTopColumn >
                <FlexTopColumn>
                {oinfo.type ==='multipleChoice'?
                    <MultipleChoiceOption id={oinfo.id} type={oinfo.type}/>
                :oinfo.type === 'checkBox' ?
                    <CheckBoxOption  id={oinfo.id} type={oinfo.type}/>
                : <DropDownOption  id={oinfo.id} type={oinfo.type}/>
                }
                </FlexTopColumn>
            </FlexTopColumn>
        </>
    )
}