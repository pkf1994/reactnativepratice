import {CHANGE_THEME} from "./actionType";

const defaultState = {
    theme: 'blue'
}

export default (state = defaultState, action) => {
    if(action.type === CHANGE_THEME) {
        return {
            ...state,
            theme:action.value
        }
    }
    return state
}
