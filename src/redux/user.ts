import { createSlice, PayloadAction, CreateSliceOptions, SliceCaseReducers } from "@reduxjs/toolkit";
import {IUser} from "../types/user";
import { IRootState } from "./root";

export interface IUserState {
    user?: IUser;
}

export type IUserAction = PayloadAction<IUser|undefined>;

const options: CreateSliceOptions<IUserState, SliceCaseReducers<IUserState>, string> = {
    name: "user",
    initialState: {
        user: undefined
    },
    reducers: {
        login: (state: IUserState, action: IUserAction) => {
            state.user=action.payload;
        },
        logout: (state: IUserState) => {
            state.user = undefined;
        }
    }    
};

export const userSlice = createSlice<IUserState, SliceCaseReducers<IUserState>, string>(options);

export const userReducer = userSlice.reducer;
export const {login, logout} = userSlice.actions;

export const selectUser = (state: IRootState) => state.user.user;