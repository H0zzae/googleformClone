import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface FormItem {
    id: number,
    order : number,
    title?: string,
    detail ?: string,
    type : string,
    subject ?:string,
    options ?: any[], //{id : 0, value:'옵션 1', selected : false}
    activated : boolean,
    necessary : boolean,
    status : boolean, // 0 : error, 1 : pass
    etc : boolean,
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