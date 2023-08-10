import React from "react"
import {FlexLeftRow} from "./ComponentStyle";
import {Button} from "@mui/material";

export const SubmitSection = () => {
    return(
        <FlexLeftRow justifyContent={'space-between'}>
            <Button variant={"contained"} sx={{padding: '6px 24px'}}>제출</Button>
            <Button variant={"text"}>양식 지우기</Button>
        </FlexLeftRow>
    )
}