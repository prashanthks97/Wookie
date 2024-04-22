import * as ActionTypes from '../actions/actionTypes';

const initialState = {
  movies: [],
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.GET_MOVIES_SUCCESS:
      return {
        ...state,
        movies: action.payload.data
      };
    default:
      return state;
  }
};

export default rootReducer;