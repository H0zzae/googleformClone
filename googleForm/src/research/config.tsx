import {combineReducers, configureStore} from "@reduxjs/toolkit";
import userSlice from "./slices/userSlice";
import {createLogger} from "redux-logger";
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import formSlice from "./slices/formSlice";

const logger = createLogger();

const rootReducer = combineReducers({
    user : userSlice.reducer,
    form : formSlice.reducer,
})

const initialState = {};

export const research = configureStore({
    reducer : rootReducer,
    middleware : (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
    devTools: process.env.NODE_ENV !== 'production',
    preloadedState: initialState,
    enhancers: (defaultEnhancers) => [...defaultEnhancers]
})

export type RootState = ReturnType<typeof research.getState>;
export type AppDispatch = typeof research.dispatch;

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export default research;