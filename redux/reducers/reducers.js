import { combineReducers } from 'redux';
import { CLEAN_INFO, SUBMIT, SUBMIT_REJECT, GET_REJECT, GET_ME, LOG_IN_FULFILLED, LOG_IN_REJECTED, GET_POSTS, POSTS_REJECT } from '../actions/actions';
import storage from 'redux-persist/lib/storage';





const merge = (prev, next) => Object.assign({}, prev, next);

const userReducer = (state = {} , action) =>{
  switch(action.type){
    case LOG_IN_FULFILLED:
      return merge(state, {token: action.payload});
    case GET_ME:
        return merge(state, {me: action.payload});
    case GET_REJECT:
        return merge(state, {meErr: action.payload});
    case LOG_IN_REJECTED:
        return merge(state, {loginErr: action.payload});
    }
  return state;
}

const postsReddit = (state = [], action) =>{
  switch(action.type){
    case GET_POSTS:
      return [...state, action.payload];
    case POSTS_REJECT:
        return merge(state, {postErr: action.payload});
  }
  return state;
}


const submitReddit = (state = {}, action) =>{
  switch(action.type){
    case SUBMIT:
        return merge(state, {submit: action.payload});
    case SUBMIT_REJECT:
        return merge(state, {submitErr: action.payload});
  }
  return state;
}

const rootReducer = (state = {}, action) =>{

  switch(action.type){
    case CLEAN_INFO:
        storage.removeItem('persist:root');
        state = undefined;
  }
  return reducer(state, action);

}



const reducer = combineReducers({
  user : userReducer,
  posts: postsReddit,
  submit: submitReddit,
})


export default rootReducer;