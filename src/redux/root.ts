import {IUserState, userReducer} from "./user";
import {IChannelState, channelReducer} from "./channel";

export interface IRootState {
    user: IUserState;
    channel: IChannelState;
}

export const rootReducer = {
    user: userReducer,
    channel: channelReducer
};


