import {CHANGE_THEME_ACTION} from "./actionType";

const defaultState = {
    theme: '#17C7A4'
}

export default (state = defaultState, action) => {
    if(action.type === CHANGE_THEME_ACTION) {
        return {
            ...state,
            theme:action.value
        }
    }
    return state
}
