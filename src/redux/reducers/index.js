import {
  FETCH_BOOKS_SUCCESS,
  GET_NAME,
  GET_TOKEN,
  FETCH_LATEST_BOOKS_SUCCESS,
  FETCH_DETAIL_BOOKS_SUCCESS,
} from '../types';

const initialState = {
  name: null,
  books: null,
  detailBooks: null,
  latestBooks: null,
  token: null,
};

const Reducer = (state = initialState, action) => {
  const {type, payload} = action;
  switch (type) {
    case FETCH_BOOKS_SUCCESS:
      return {...state, books: payload};
    case FETCH_DETAIL_BOOKS_SUCCESS:
      return {...state, books: payload};
    case FETCH_LATEST_BOOKS_SUCCESS:
      return {...state, latestBooks: payload};
    case GET_NAME:
      return {...state, name: payload};
    case GET_TOKEN:
      return {...state, token: payload};
    default:
      return state;
  }
};

export default Reducer;
