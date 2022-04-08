import {applyMiddleware, combineReducers, createStore} from 'redux';
import ReduxThunk from 'redux-thunk';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {persistStore, persistReducer} from 'redux-persist';
import Reducer from '../reducers';

const Reducers = {
  appData: Reducer,
};

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
};

const configPersist = persistReducer(persistConfig, combineReducers(Reducers));

export const store = createStore(configPersist, applyMiddleware(ReduxThunk));

export const persistor = persistStore(store);
