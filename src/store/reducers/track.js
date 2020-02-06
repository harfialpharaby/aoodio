import {
    FETCH_TRACK_START,
    FETCH_TRACK_SUCCESS,
    FETCH_TRACK_FAIL
} from "../actionTypes";

const initialState = {
    isLoading: false,
    err: null,
    tracks: []
};

export default function (state = initialState, action) {
    switch (action.type) {
        case FETCH_TRACK_START:
            return {
                ...state,
                isLoading: true,
                tracks: []
            };
        case FETCH_TRACK_SUCCESS:
            return {
                ...state,
                isLoading: false,
                tracks: action.tracks
            };
        case FETCH_TRACK_FAIL:
            return {
                ...state,
                isLoading: false,
                err: action.err
            };
        default:
            return state;
    }
}