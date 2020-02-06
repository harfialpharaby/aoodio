import { combineReducers } from "redux";
import albums from './albums'
import track from './track'
import artist from './artist'

export default combineReducers({ albums, track, artist });