import {combineReducers} from 'redux';
import post from '../reducers/blogReducer';
import comment from '../reducers/commentReducer';
import currentPost from '../reducers/currentPostReducer';

const rootReducer = combineReducers({
    post: post,
    comment: comment,
    currentPost: currentPost,
})

export default rootReducer;