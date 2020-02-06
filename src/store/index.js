import {createStore, applyMiddleware} from 'redux'
import rootReducer from './reducers'
import { thunk } from './middlewares'

export default createStore(rootReducer, applyMiddleware(thunk))