import {combineReducers} from 'redux'
import {uiReducer} from "./module";

export default combineReducers({
    ui:uiReducer
})