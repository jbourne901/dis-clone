import { createSlice, PayloadAction, CreateSliceOptions, SliceCaseReducers } from "@reduxjs/toolkit";
import {IChannel} from "../types/channel";
import { IRootState } from "./root";

export interface IChannelState {
    channel?: IChannel;
}

export type IChannelAction = PayloadAction<IChannel|undefined>;

const options: CreateSliceOptions<IChannelState, SliceCaseReducers<IChannelState>, string> = {
    name: "channel",
    initialState: {
        channel: undefined
    },
    reducers: {
        setChannel: (state: IChannelState, action: PayloadAction<IChannel>) => {
            state.channel = action.payload;
        }
    }    
};

export const channelSlice = createSlice<IChannelState, SliceCaseReducers<IChannelState>, string>(options);

export const channelReducer = channelSlice.reducer;
export const {setChannel} = channelSlice.actions;

export const selectChannel = (state: IRootState) => state.channel.channel;