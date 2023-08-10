import React from "react"
import Tooltip from "@mui/material/Tooltip";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import NoteAddOutlinedIcon from '@mui/icons-material/NoteAddOutlined';
import TextFieldsOutlinedIcon from '@mui/icons-material/TextFieldsOutlined';
import InsertPhotoOutlinedIcon from '@mui/icons-material/InsertPhotoOutlined';
import SmartDisplayOutlinedIcon from '@mui/icons-material/SmartDisplayOutlined';
import SplitscreenSharpIcon from '@mui/icons-material/SplitscreenSharp';
import {IconButton} from "@mui/material";
import {FloatingBar} from "./ComponentStyle";

export const MenuBar = () => {
    return(
        <FloatingBar>
            <Tooltip title={"질문 추가"}>
                <IconButton>
                    <AddCircleOutlineIcon />
                </IconButton>
            </Tooltip>
            <Tooltip title={"질문 가져오기"}>
                <IconButton>
                    <NoteAddOutlinedIcon />
                </IconButton>
            </Tooltip>
            <Tooltip title={"제목 및 설명 추가"}>
                <IconButton>
                    <TextFieldsOutlinedIcon />
                </IconButton>
            </Tooltip>
            <Tooltip title={"이미지 추가"}>
                <IconButton>
                    <InsertPhotoOutlinedIcon />
                </IconButton>
            </Tooltip>
            <Tooltip title={"동영상 추가"}>
                <IconButton>
                    <SmartDisplayOutlinedIcon />
                </IconButton>
            </Tooltip>
            <Tooltip title={"섹션 추가"}>
                <IconButton>
                    <SplitscreenSharpIcon />
                </IconButton>
            </Tooltip>
        </FloatingBar>
    )
}