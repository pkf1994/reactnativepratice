import {CommonAction,CommonActionId} from '../commonActionType'

const defaultState = {
    pageIndex: 1,
    pageScale: 8,
    maxPageIndex: 3,
    paginationLinks: {}
}

export default (state = defaultState, action) => {
    if(action.type === CommonAction.GET_DATA_SUCCESS) {
        if(action.payload.id !== CommonActionId.GET_POPULAR_DATA) return state
        return {
            ...state,
            [action.payload.storeName]: {
                ...state[action.payload.storeName],
                items: action.payload.data,
                loading: false
            }
        }
    }

    if(action.type === CommonAction.GET_MORE_DATA_SUCCESS) {
        if(action.payload.id !== CommonActionId.GET_POPULAR_DATA) return state
        return {
            ...state,
            [action.payload.storeName]: {
                ...state[action.payload.storeName],
                items: [...state[action.payload.storeName].items,...action.payload.data],
                loadingMore: false
            }
        }
    }

    if(action.type === CommonAction.TRIGGER_LOADING) {
        if(action.payload.id !== CommonActionId.GET_POPULAR_DATA) return state
        return {
            ...state,
            [action.payload.storeName]: {
                ...state[action.payload.storeName],
                loading: action.payload.loading
            }
        }
    }

    if(action.type === CommonAction.TRIGGER_LOADINGMORE) {
        if(action.payload.id !== CommonActionId.GET_POPULAR_DATA) return state
        return {
            ...state,
            [action.payload.storeName]: {
                ...state[action.payload.storeName],
                loadingMore: action.payload.loadingMore
            }
        }
    }

    if(action.type === CommonAction.GET_DATA_FAIL) {
        if(action.payload.id !== CommonActionId.GET_POPULAR_DATA) return state
        return {
            ...state,
            [action.payload.storeName]: {
                ...state[action.payload.storeName],
                loading: false
            }
        }
    }

    if(action.type === CommonAction.GET_MORE_DATA_FAIL) {
        if(action.payload.id !== CommonActionId.GET_POPULAR_DATA) return state
        return {
            ...state,
            [action.payload.storeName]: {
                ...state[action.payload.storeName],
                loadingMore: false
            }
        }
    }

    if(action.type === CommonAction.UPDATE_PAGINATION_LINKS) {
        if(action.payload.id !== CommonActionId.GET_POPULAR_DATA) return state
        return {
            ...state,
            [action.payload.storeName]: {
                ...state[action.payload.storeName],
                paginationLinks: action.payload.paginationLinks
            }
        }
    }

    return state
}
