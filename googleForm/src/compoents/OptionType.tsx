import React from "react"
import {FlexLeftRow, FlexTopColumn} from "./ComponentStyle";
import {TextInputBox} from "./TextInputBox";
import ImageOutlinedIcon from "@mui/icons-material/ImageOutlined";
import {AnswerTypeSelect} from "./AnswerTypeSelect";
import {MultipleChoiceOption} from "./MultipleChoiceOption";

interface optionTypeinfo {
    title?: string;
    type ?:string;
}
export const OptionType = (oinfo:optionTypeinfo) => {
    
    return(
        <>
            <FlexTopColumn paddingLeft={24} paddingRight={24}>
                <FlexLeftRow justifyContent={'space-between'} gap={8}>
                    <TextInputBox title={oinfo.title}/>
                    <ImageOutlinedIcon sx={{fontSize: 24}}/>
                    <AnswerTypeSelect type={oinfo.type}/>
                </FlexLeftRow>
                <FlexTopColumn>
                    <MultipleChoiceOption />
                </FlexTopColumn>
            </FlexTopColumn>
        </>
    )
}