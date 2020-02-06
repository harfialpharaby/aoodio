import {
  FETCH_ALBUMS_START,
  FETCH_ALBUMS_SUCCESS,
  FETCH_ALBUMS_FAIL
} from "../actionTypes";

const initialState = {
  isLoading: false, 
  err: null,
  albums: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case FETCH_ALBUMS_START: 
      return {
        ...state,
        albums: [],
        isLoading: true
      };
    case FETCH_ALBUMS_SUCCESS: 
      return {
        ...state,
        isLoading: false,
        albums: action.albums
      };
    case FETCH_ALBUMS_FAIL: 
      return {
        ...state,
        isLoading: false,
        err: action.err
      };
    default:
      return state;
  }
}
