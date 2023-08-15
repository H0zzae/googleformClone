import React from "react"
import {FlexTopColumn} from "./ComponentStyle";
import {MultipleChoiceOption} from "./MultipleChoiceOption";
import {CheckBoxOption} from "./CheckBoxOption";
import {DropDownOption} from "./DropDownOption";

interface optionTypeinfo {
    id: number;
    type ?:string;
    activated : boolean;
}
export const OptionType = (oinfo:optionTypeinfo) => {

    return(
        <>
            <FlexTopColumn >
                <FlexTopColumn>
                {oinfo.type ==='multipleChoice'?
                    <MultipleChoiceOption id={oinfo.id} type={oinfo.type} activated={oinfo.activated}/>
                :oinfo.type === 'checkBox' ?
                    <CheckBoxOption  id={oinfo.id} type={oinfo.type} activated={oinfo.activated}/>
                : <DropDownOption  id={oinfo.id} type={oinfo.type} activated={oinfo.activated}/>
                }
                </FlexTopColumn>
            </FlexTopColumn>
        </>
    )
}