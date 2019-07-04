import {createStore,applyMiddleware} from 'redux'
import ReduxThunk  from 'redux-thunk'
//import { composeWithDevTools } from 'redux-devtools-extension';
import { persistStore, persistReducer } from 'redux-persist'
import AsyncStorage from '@react-native-community/async-storage';
import { createLogger } from 'redux-logger'
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2'
import reducer from './reducer'

const persistConfig = {
    key: 'root',
    storage: AsyncStorage
    //stateReconciler: autoMergeLevel2
}

const logger = store => next => action => {
    if(typeof action === 'function') {
        console.log('dispatch a func')
    } else {
        console.log('dispatch ',action)
    }
    const result = next(action)
    console.log('nextState',store.getState())
}

const middlewares = [
    ReduxThunk,
    //logger
]

if (process.env.NODE_ENV !== 'production') {
    middlewares.push(createLogger());
}

const persistedReducer = persistReducer(persistConfig, reducer)

const store = createStore(persistedReducer,applyMiddleware(...middlewares))

let persistor = persistStore(store);

// Exports
export {
    store,
    persistor,
};

