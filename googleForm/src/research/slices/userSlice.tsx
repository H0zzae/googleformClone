import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {UserService} from '../../services/userService';

interface CommonState {
    value : "write" | "preview" | "submit"
}

const initialState : CommonState = {
    value : "write"
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setVisible(state, action:PayloadAction<any>) {
            state.value = action.payload
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(UserService.getUser.pending, (state, action) => {
                console.log('pending');
            })
            .addCase(UserService.getUser.fulfilled, (state, action) => {
                console.log('fulfilled');
            })
            .addCase(UserService.getUser.rejected, (state, action) => {
                console.log('rejected');
            })
    }
});

export const {setVisible} = userSlice.actions;
export default userSlice;