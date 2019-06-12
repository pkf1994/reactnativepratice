import {CHANGE_THEME} from "./actionType";

export const createAction_changeTheme = (payload) => ({
    type: CHANGE_THEME,
    value: payload
})

