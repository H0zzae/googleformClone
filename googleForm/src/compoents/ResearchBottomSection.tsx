import React from "react"
import {IconButton, Menu, MenuItem, Switch} from "@mui/material";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Check from '@mui/icons-material/Check';

export interface BottomSectionInfo {
    id : number | undefined
}
const options = ['개제', '설명', '응답확인'];
const ITEM_HEIGHT = 48;
export const ResearchBottomSection = (info:BottomSectionInfo) =>{
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    return(
        <div>
            <button>copy</button>
            <button>delete</button>
            <hr/>
            <div>
                <div>
                    <p>필수</p>
                    <Switch />
                </div>
                <div>
                    <IconButton
                        aria-label="more"
                        id="long-button"
                        aria-controls={open ? 'long-menu' : undefined}
                        aria-expanded={open ? 'true' : undefined}
                        aria-haspopup="true"
                        onClick={handleClick}
                    >
                        <MoreVertIcon />
                    </IconButton>
                    <Menu
                        id="long-menu"
                        MenuListProps={{
                            'aria-labelledby': 'long-button',
                        }}
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                        PaperProps={{
                            style: {
                                maxHeight: ITEM_HEIGHT * 4.5,
                                width: '20ch',
                            },
                        }}
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
                    </Menu>
                </div>
            </div>
        </div>
    )
}