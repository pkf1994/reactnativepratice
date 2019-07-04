import {CommonAction,CommonActionId} from '../commonActionType'

const defaultState = {
    pageScale: 9
}

export default (state = defaultState, action) => {
    if(action.type === CommonAction.GET_DATA_SUCCESS) {
        if(action.payload.id !== CommonActionId.GET_TRENDING_DATA) return state
        return {
            ...state,
            [action.payload.storeName]: {
                ...state[action.payload.storeName],
                items: action.payload.data,
                cursorIndex:  state.pageScale,
                loading: false
            }
        }
    }

    if(action.type === CommonAction.GET_MORE_DATA_SUCCESS) {
        if(action.payload.id !== CommonActionId.GET_TRENDING_DATA) return state
        return {
            ...state,
            [action.payload.storeName]: {
                ...state[action.payload.storeName],
                cursorIndex: state[action.payload.storeName].cursorIndex + state.pageScale,
                loadingMore: false
            }
        }
    }

    if(action.type === CommonAction.TRIGGER_LOADING) {
        if(action.payload.id !== CommonActionId.GET_TRENDING_DATA) return state
        return {
            ...state,
            [action.payload.storeName]: {
                ...state[action.payload.storeName],
                loading: action.payload.loading
            }
        }
    }

    if(action.type === CommonAction.TRIGGER_LOADINGMORE) {
        if(action.payload.id !== CommonActionId.GET_TRENDING_DATA) return state
        return {
            ...state,
            [action.payload.storeName]: {
                ...state[action.payload.storeName],
                loadingMore: action.payload.loadingMore
            }
        }
    }

    if(action.type === CommonAction.GET_DATA_FAIL) {
        if(action.payload.id !== CommonActionId.GET_TRENDING_DATA) return state
        return {
            ...state,
            [action.payload.storeName]: {
                ...state[action.payload.storeName],
                loading: false
            }
        }
    }

    /*if(action.type === CommonAction.GET_MORE_DATA_FAIL) {
        if(action.payload.id !== CommonActionId.GET_TRENDING_DATA) return
        return {
            ...state,
            [action.payload.storeName]: {
                ...state[action.payload.storeName],
                loadingMore: false
            }
        }
    }*/

    /*if(action.type === CommonAction.UPDATE_PAGINATION_LINKS) {
        if(action.payload.id !== CommonActionId.GET_TRENDING_DATA) return
        return {
            ...state,
            [action.payload.storeName]: {
                ...state[action.payload.storeName],
                paginationLinks: action.payload.paginationLinks
            }
        }
    }*/

    return state
}
