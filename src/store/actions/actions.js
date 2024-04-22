import * as ActionTypes from './actionTypes';
import axios from '../../api';

export const getMoviesRequest = () => {
  return { type: ActionTypes.GET_MOVIES_REQUEST };
};

export const getMoviesSuccess = (data) => {
  return { type: ActionTypes.GET_MOVIES_SUCCESS, payload: data };
};

export const getMoviesFailure = (error) => {
  return { type: ActionTypes.GET_MOVIES_FAILURE, payload: error };
};

export const getMovies = () => {
  return async (dispatch) => {
    try {
      // dispatch(getMoviesRequest())
      const data = await axios.get();
      dispatch(getMoviesSuccess(data));
      return data;
    } catch (error) {
      dispatch(getMoviesFailure(error))
      return error;
    }
  };
};

export const getMovieDetails = (slug) => {
  return async (dispatch) => {
    try {
      dispatch(getMoviesRequest())
      const data = await axios.get(`/${slug}`);
      dispatch(getMoviesSuccess(data));
      return data;
    } catch (error) {
      dispatch(getMoviesFailure(error))
      return error;
    }
  };
};

