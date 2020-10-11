import {configureStore, ConfigureStoreOptions} from "@reduxjs/toolkit";
import {AnyAction} from "redux";
import {IRootState, rootReducer} from "./root";

const options: ConfigureStoreOptions<IRootState, AnyAction, any> = {
    reducer: rootReducer
};

export const store = configureStore<IRootState, AnyAction>(options);
