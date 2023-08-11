import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface FormItem {
    id: number,
    // order : number,
    title?: string,
    detail ?: string,
    type : string,
    subject ?:string,
    activated: boolean,
}

export interface CommonState {
    formList: FormItem[]
}

const initialState: CommonState = {
    formList: []
};

export const formSlice = createSlice({
    name: 'form',
    initialState,
    reducers: {
        setForm(state, action: PayloadAction<FormItem[]>) {
            state.formList = action.payload;
        }
    }
});

export const {setForm} = formSlice.actions;

export default formSlice;