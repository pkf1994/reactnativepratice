import {CommonAction,CommonActionId} from "../commonActionType";
import DataStore from "../../../dao/DataStore";
import {linkParser} from "../../../util/linkParser";

export const createSyncAction_getPopularData = (storeName, url) => {
    return dispatch => {
        dispatch({
            type: CommonAction.TRIGGER_LOADING,
            payload: {
                id: CommonActionId.GET_POPULAR_DATA,
                storeName: storeName,
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
                    id: CommonActionId.GET_POPULAR_DATA,
                    paginationLinks: linkObj,
                    storeName
                }
            })
            dispatch({
                type: CommonAction.GET_DATA_SUCCESS,
                payload: {
                    id: CommonActionId.GET_POPULAR_DATA,
                    data: wrappedData.data && wrappedData.data.items,
                    storeName
                }
            })
        }).catch(e => {
            console.log(e)
            dispatch({
                type: CommonAction.GET_DATA_FAIL,
                payload: {
                    id: CommonActionId.GET_POPULAR_DATA,
                    storeName,
                    error: e
                }
            })
        })
    }
}

export const createSyncAction_getMorePopularData = (storeName, url, callback) => {
    return dispatch => {
        dispatch({
            type: CommonAction.TRIGGER_LOADINGMORE,
            payload: {
                id: CommonActionId.GET_POPULAR_DATA,
                storeName: storeName,
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
                    id: CommonActionId.GET_POPULAR_DATA,
                    paginationLinks: linkObj,
                    storeName
                }
            })
            dispatch({
                type: CommonAction.GET_MORE_DATA_SUCCESS,
                payload: {
                    id: CommonActionId.GET_POPULAR_DATA,
                    data: wrappedData.data && wrappedData.data.items,
                    storeName
                }
            })
            callback('load more success')
        }).catch(e => {
            console.log(e)
            dispatch({
                type: CommonAction.GET_MORE_DATA_FAIL,
                payload: {
                    id: CommonActionId.GET_POPULAR_DATA,
                    storeName,
                    error: e
                }
            })
            callback('load more fail')
        })
    }
}
