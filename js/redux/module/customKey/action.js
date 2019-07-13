import {UPDATE_CHECKED_KEY_LIST_ACTION,RESORT_CHECKED_KEY_LIST_ACTION} from "./actionType";

export const createAction_updateCheckedKeyList = (payload) => ({
    type: UPDATE_CHECKED_KEY_LIST_ACTION,
    payload: payload
})

export const createAction_resortCheckedKeyList = (payload) => ({
    type: RESORT_CHECKED_KEY_LIST_ACTION,
    payload: payload
})

