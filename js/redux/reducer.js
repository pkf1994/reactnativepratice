import {combineReducers} from 'redux'
import {uiReducer,popularReducer,trendingReducer,favoriteReducer,customKeyReducer,searchReducer} from "./module";

export default combineReducers({
    ui: uiReducer,
    popular: popularReducer,
    trending: trendingReducer,
    favorite: favoriteReducer,
    customKey: customKeyReducer,
    search: searchReducer
})