import React, {useCallback} from "react"
import {IconButton, Menu, MenuItem, Switch,FormControlLabel} from "@mui/material";
import Divider from "@mui/material/Divider";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Tooltip from '@mui/material/Tooltip';
import ContentCopy from '@mui/icons-material/ContentCopy';
import DeleteIcon from '@mui/icons-material/Delete';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Check from '@mui/icons-material/Check';
import {CustomHeightDiv, FlexRightRow} from "./ComponentStyle";
import {useAppDispatch, useAppSelector} from "../research/config";
import {setForm} from "../research/slices/formSlice";

export interface BottomSectionInfo {
    id : number;
    checked : boolean;
}
const options = ['개제', '설명', '답변을 기준으로 섹션 이동'];
const shuffles = ['옵션 순서 무작위로 섞기']

export const ResearchBottomSection = (info:BottomSectionInfo) =>{
    const {formList} = useAppSelector(state => state.form);
    const dispatch = useAppDispatch();

    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const RemoveForm = useCallback((id : number) => {
        const setFormList = [...formList];
        const removeIndex = setFormList.findIndex(item => item.id === id);

        setFormList.splice(removeIndex, 1);
        dispatch(setForm(setFormList));
    },[dispatch, formList]);

    const handleSwitch = useCallback((event : React.ChangeEvent<HTMLInputElement>) => {
        console.log(info.id,  event.target.checked);
        const modForm = formList.map((i) => {
            if (i.id === info.id){
                return {...i, necessary : event.target.checked}
            }else return i
        })
        dispatch(setForm(modForm));
    },[dispatch, formList]);

    return (
        <CustomHeightDiv height={65} paddingTop={24}>
            <Divider variant="middle" />
            <FlexRightRow>
                <FlexRightRow>
                    <Tooltip title="복사">
                        <IconButton aria-label="copy">
                            <ContentCopy sx={{fontSize : 24}}/>
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="삭제">
                        <IconButton aria-label="delete" onClick={() => RemoveForm(info.id)}>
                            <DeleteIcon sx={{fontSize : 24}}/>
                        </IconButton>
                    </Tooltip>
                    <Divider orientation="vertical" variant="middle" flexItem />
                    <FlexRightRow>
                        <FormControlLabel
                            value="necessary"
                            control={<Switch color="primary" onChange={handleSwitch}/>}
                            label="필수"
                            labelPlacement="start"
                        />
                        <div>
                            <IconButton
                                aria-label="more"
                                id="long-button"
                                aria-controls={open ? 'long-menu' : undefined}
                                aria-expanded={open ? 'true' : undefined}
                                aria-haspopup="true"
                                size="large"
                                onClick={handleClick}
                            >
                                <MoreVertIcon/>
                            </IconButton>
                            <Menu
                                id="long-menu"
                                MenuListProps={{
                                    'aria-labelledby': 'long-button',
                                }}
                                anchorEl={anchorEl}
                                open={open}
                                onClose={handleClose}
                            >
                                {options.map((option, index) => (
                                    <MenuItem key={option}
                                              selected={index === 1}
                                              onClick={handleClose}
                                              disabled={index === 0}>
                                        {index === 1 ?
                                            <ListItemIcon><Check/>{option}</ListItemIcon>
                                            :
                                            <ListItemText inset>{option}</ListItemText>
                                        }
                                    </MenuItem>
                                ))}
                                <Divider />
                                {shuffles.map((item, index) => (
                                    <MenuItem key={item}
                                              selected={index!=0}
                                              onClick={handleClose}>
                                        <ListItemText inset>{item}</ListItemText>
                                    </MenuItem>
                                ))}
                            </Menu>
                        </div>
                    </FlexRightRow>
                </FlexRightRow>
            </FlexRightRow>
        </CustomHeightDiv>
    );
}