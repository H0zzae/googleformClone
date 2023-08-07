import {createAsyncThunk} from '@reduxjs/toolkit';
// import {instance} from '../hooks/useAxiosLoader';

export const UserService = {

    /**
     * Get User
     */
    getUser: createAsyncThunk(
        'user/getUser',
        async (userId: string, thunkApi) => {
            // const {data} = await instance.get(
            //     `/users/${userId}`
            // );
            // return data;
        }
    )

};