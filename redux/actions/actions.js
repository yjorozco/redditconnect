import { login, posts, meUser, submit } from '../../Api/Api';



export const LOG_IN_SENT = 'LOG_IN_SENT';
export const LOG_IN_FULFILLED = 'LOG_IN_FUL_FILLED';
export const LOG_IN_REJECTED = 'LOG_IN_REJECTED';
export const GET_POSTS = 'GET_POSTS';
export const POSTS_REJECT = 'POSTS_REJECT';
export const GET_ME = 'GET_ME';
export const SUBMIT = 'SUBMIT';
export const SUBMIT_REJECT = 'SUBMIT_REJECT';
export const GET_REJECT = 'GET_REJECT';
export const CLEAN_INFO = 'CLEAN_INFO';

export const logInUser = (username, password) => async dispatch =>{

    dispatch({type: LOG_IN_SENT});
    try{
        const token = await login(username,password);  
        if(typeof token.error !== 'undefined')
            throw new Error(token.error)   
        dispatch({type: LOG_IN_REJECTED, payload: ""});             
        dispatch({type: LOG_IN_FULFILLED, payload: token.access_token});
    }catch (err){
        dispatch({type: LOG_IN_REJECTED, payload:err.message})
    }

}

export const postReddit = () =>  async dispatch => {
    try{
        const postsList = await posts(25);
        if (typeof postsList.error !== 'undefined')
            throw new Error(postsList.error) 
        dispatch({type: GET_POSTS, payload:postsList});
    }catch(err){
        dispatch({type: POSTS_REJECT, payload:err.message})
    }
}

export const meProfile = (token) => async dispatch => {
    try{
        const meUserProfile = await meUser(token);
        if (typeof meUserProfile.error !== 'undefined')
            throw new Error(meUserProfile.error) 
        dispatch({type: GET_ME, payload:meUserProfile});
    }catch(err){
        dispatch({type: GET_REJECT, payload:err.message})
    }
}


export const postSubmit = (info) => async dispatch => {
    try{
        const postSubmit = await submit(info);
        if (typeof postSubmit.error !== 'undefined')
            throw new Error(postSubmit.error) 
        dispatch({type: SUBMIT, payload:postSubmit});
    }catch(err){
        dispatch({type: SUBMIT_REJECT, payload:err.message})
    }
}

export const cleanInfo   = () => dispatch =>{
    dispatch({type: CLEAN_INFO, payload:{}});
}