import {CommonAction,CommonActionId} from "../commonActionType";
import DataStore from "../../../dao/DataStore";
import {linkParser} from "../../../util/linkParser";

export const createAsyncAction_getSearchData = (url) => {
    return dispatch => {
        dispatch({
            type: CommonAction.TRIGGER_LOADING,
            payload: {
                id: CommonActionId.GET_SEARCH_DATA,
                loading: true
            }
        })
        DataStore.fetchData(url).then(wrappedData => {
            const headers = wrappedData.headers
            const linkStr = headers.link
            const linkObj = linkParser(linkStr)
            dispatch({
                type: CommonAction.UPDATE_PAGINATION_LINKS,
                payload: {
                    id: CommonActionId.GET_SEARCH_DATA,
                    paginationLinks: linkObj,
                }
            })
            dispatch({
                type: CommonAction.GET_DATA_SUCCESS,
                payload: {
                    id: CommonActionId.GET_SEARCH_DATA,
                    data: wrappedData.data && wrappedData.data.items,
                }
            })
        }).catch(e => {
            console.log(e)
            dispatch({
                type: CommonAction.GET_DATA_FAIL,
                payload: {
                    id: CommonActionId.GET_SEARCH_DATA,
                    error: e
                }
            })
        })
    }
}

export const createAsyncAction_getMoreSearchData = (url, callback) => {
    return dispatch => {
        dispatch({
            type: CommonAction.TRIGGER_LOADINGMORE,
            payload: {
                id: CommonActionId.GET_SEARCH_DATA,
                loadingMore: true
            }
        })
        DataStore.fetchData(url).then(wrappedData => {
            const headers = wrappedData.headers
            const linkStr = headers.link
            const linkObj = linkParser(linkStr)
            dispatch({
                type: CommonAction.UPDATE_PAGINATION_LINKS,
                payload: {
                    id: CommonActionId.GET_SEARCH_DATA,
                    paginationLinks: linkObj,

                }
            })
            dispatch({
                type: CommonAction.GET_MORE_DATA_SUCCESS,
                payload: {
                    id: CommonActionId.GET_SEARCH_DATA,
                    data: wrappedData.data && wrappedData.data.items,

                }
            })
            callback('load more success')
        }).catch(e => {
            console.log(e)
            dispatch({
                type: CommonAction.GET_MORE_DATA_FAIL,
                payload: {
                    id: CommonActionId.GET_SEARCH_DATA,
                    error: e
                }
            })
            callback('load more fail')
        })
    }
}
