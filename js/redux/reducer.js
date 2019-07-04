import {combineReducers} from 'redux'
import {uiReducer,popularReducer,trendingReducer,favoriteReducer} from "./module";

export default combineReducers({
    ui: uiReducer,
    popular: popularReducer,
    trending: trendingReducer,
    favorite: favoriteReducer
})