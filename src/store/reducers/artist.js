import {
    FETCH_ARTIST_START,
    FETCH_ARTIST_SUCCESS,
    FETCH_ARTIST_FAIL
} from "../actionTypes";

const initialState = {
    isLoading: false,
    err: null,
    artists: []
};

export default function (state = initialState, action) {
    switch (action.type) {
        case FETCH_ARTIST_START:
            return {
                ...state,
                isLoading: true,
                artists: []
            };
        case FETCH_ARTIST_SUCCESS:
            return {
                ...state,
                isLoading: false,
                artists: action.artists
            };
        case FETCH_ARTIST_FAIL:
            return {
                ...state,
                isLoading: false,
                err: action.err
            };
        default:
            return state;
    }
}