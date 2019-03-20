import { createStore, combineReducers, compose, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

import userReducer from './reducers/user'
import postsReducer from './reducers/posts'

//creating variable to combine all reducers of application
const reducers = combineReducers({
    user: userReducer,
    posts: postsReducer
})

const storeConfig = () => {
    return createStore(reducers, compose(applyMiddleware(thunk)))
}

export default storeConfig