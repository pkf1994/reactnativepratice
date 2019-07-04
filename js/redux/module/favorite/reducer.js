import {UPDATE_FAVORITE_LIST_ACTION} from "./actionType";

const defaultState = {
    popular: [],
    trending: []
}

export default (state = defaultState, action) => {
    if(action.type === UPDATE_FAVORITE_LIST_ACTION) {
        const alreadyBeenMarkAsFavorite = state[action.payload.id].some((item) => {
            return item.key === action.payload.key
        })
        if(!alreadyBeenMarkAsFavorite) {
            return {
                ...state,
                [action.payload.id]: [
                    ...state[action.payload.id],
                    {
                        key: action.payload.key,
                        item: action.payload.item
                    }
                ]
            }
        } else {
            const favoriteList = state[action.payload.id]
            try{
                favoriteList.forEach((item, index) => {
                    if(item.key === action.payload.key) {
                        favoriteList.splice(index,1)
                        throw new Error('Cycle abortion')
                    }
                })
            }catch (e) {
                if(e.message !== 'Cycle abortion') {
                    throw e
                }
            }
            return {
                ...state,
                [action.payload.id]: [...favoriteList]
            }
        }
    }
    return state
}
