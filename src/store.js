import { createStore, combineReducers, applyMiddleware } from "redux";
import { createLogger } from 'redux-logger'

// types
const CHANGE_SEARCH_FIELD = 'CHANGE_SEARCH_FIELD';
const GET_ROBOTS_SUCCESS = 'GET_ROBOTS_SUCCESS';
const GET_ROBOTS_FAILED = 'GET_ROBOTS_FAILED';
const GET_ROBOTS_PENDING = 'GET_ROBOTS_PENDING';

// actions
export const changeSearchFieldAction = (dispatch, inputText) => {
  console.log({ dispatch, inputText });
  dispatch({
    type: CHANGE_SEARCH_FIELD,
    payload: inputText,
  }) 
}

export const getRobots = (dispatch) => {
  dispatch({ type: GET_ROBOTS_PENDING });
  fetch('https://jsonplaceholder.typicode.com/users')
    .then(response=> response.json())
    .then(users => {
      dispatch({
        type: GET_ROBOTS_SUCCESS,
        payload: users, 
      })
    })
    .catch(error => {
      dispatch({
        type: GET_ROBOTS_FAILED,
        payload: error.message || 'Unable to fetch robots at the moment :(', 
      })
    })
} 

// reducers
export const searchRobotReducer = (state = { searchfield: '' }, action = {}) => {
  switch (action.type) {
    case CHANGE_SEARCH_FIELD: {
      return { ...state, searchfield: action.payload };
    }
    default: {
      return state;
    }
  }
}
export const robotsReducer = (state = { robots: [], isPending: false, error: null }, action = {}) => {
  switch (action.type) {
    case GET_ROBOTS_SUCCESS: {
      return { ...state, robots: action.payload, isPending: false, error: null };
    }
    case GET_ROBOTS_FAILED: {
      return { ...state, error: action.payload, isPending: false };
    }
    case GET_ROBOTS_PENDING: {
      return { ...state, isPending: true, error: null }
    }
    default: {
      return state;
    }
  }
}

// reducer
const rootReducer = combineReducers({ 
  searchRobotReducer, 
  robotsReducer 
});

// middleware
const logger = createLogger();

// store
export const store = createStore(rootReducer, applyMiddleware(logger));
