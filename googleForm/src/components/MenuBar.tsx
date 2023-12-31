import React, {useCallback, useEffect, useState} from "react"
import Tooltip from "@mui/material/Tooltip";
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import NoteAddOutlinedIcon from '@mui/icons-material/NoteAddOutlined';
import TextFieldsOutlinedIcon from '@mui/icons-material/TextFieldsOutlined';
import InsertPhotoOutlinedIcon from '@mui/icons-material/InsertPhotoOutlined';
import SmartDisplayOutlinedIcon from '@mui/icons-material/SmartDisplayOutlined';
import SplitscreenSharpIcon from '@mui/icons-material/SplitscreenSharp';
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';
import {IconButton} from "@mui/material";
import {FloatingBar} from "./ComponentStyle";
import {useAppDispatch, useAppSelector} from "../research/config";
import {setForm,FormItem} from "../research/slices/formSlice";
import {setVisible} from "../research/slices/userSlice";


export const MenuBar = () => {
    const {formList} = useAppSelector(state => state.form);
    const {value} = useAppSelector(state => state.user);
    const dispatch = useAppDispatch();
    const [scrollY, setScrollY] = useState<number>(0);

    const AddForm = useCallback((event:any) => {
        event.preventDefault();

        const AddItem: FormItem = {
            id : (!formList.length) ? 0 : Math.max(...formList.map((item) => item.id)) + 1,
            order : (!formList.length) ? 0 : Math.max(...formList.map((item) => item.id)) + 1,
            type : "shortAnswer",
            activated : true,
            necessary : false,
            status : true,
            etc : false,
        };
        const prevForm = formList.map((i) => {
            if(i.activated){
                return{...i, activated : false }
            }else return i
        });
        const setFormList = [...prevForm, AddItem];
        dispatch(setForm(setFormList));
    }, [dispatch, formList]);

    const changeValue = useCallback((param:string) => {
        const modForm = formList.map((i) => {
            return {...i, activated: false}
        });
        dispatch(setForm(modForm));
        dispatch(setVisible(param));
    },[dispatch, formList]);

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        }
    }, []);
    const handleScroll = () => {
        setScrollY(window.scrollY < 0? 150 : window.scrollY + 150);
    }
    return(
        <FloatingBar yposition={scrollY}>
            {value==="preview" ?
                <Tooltip title={"설문 수정"}>
                    <IconButton onClick={()=>changeValue("write")}>
                        <ModeEditOutlineOutlinedIcon />
                    </IconButton>
                </Tooltip>
            :
            <>
                <Tooltip title={"미리보기"}>
                    <IconButton onClick={()=>changeValue("preview")}>
                        <RemoveRedEyeOutlinedIcon />
                    </IconButton>
                </Tooltip>
                <Tooltip title={"질문 추가"}>
                    <IconButton onClick={AddForm}>
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
            </>}
        </FloatingBar>
    )
}