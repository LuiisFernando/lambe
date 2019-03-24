import {
    ADD_COMMENT,
    SET_POSTS,
    CREATING_POSTS,
    POST_CREATED 
} from './actionTypes'
import { setMessage } from './message' 

import axios from 'axios'

export const addPost = post => {
    // redux-thunk send 2 parameters (dispatch and getState)
    // getState is globalState of app (never update the globalState, just read) update dispatching
    return (dispatch, getState) => {
        // call the action creatingPost to update the view if necessary
        dispatch(creatingPost())

        // posting image to function on firebase
        axios({
            url: 'uploadImage',
            baseURL: 'https://us-central1-lambe-react.cloudfunctions.net',
            method: 'post',
            data: {
                image: post.image.base64
            }
        })
            .catch(err => {
                // if get some error dispatching to update view and setMessage with error
                dispatch(setMessage({
                    title: 'Erro',
                    text: 'Ocorreu um erro inesperado!'
                }))
            })
            .then(res => {
                // taking the return of function on firebase with url of image
                post.image = res.data.imageUrl
                
                // posting to post.json
                axios.post(`/posts.json?auth=${getState().user.token}`, { ...post })
                    .catch(err => {
                        dispatch(setMessage({
                            title: 'Erro',
                            text: err
                        }))
                    })
                    .then(res => {
                        dispatch(fetchPosts())
                        dispatch(postCreated())
                    })
            })
    }
}

export const addComment = payload => {
    return (dispatch, getState) => {
        axios.get(`/posts/${payload.postId}.json`)
            .catch(err => {
                // if get some error dispatching to update view and setMessage with error
                dispatch(setMessage({
                    title: 'Erro',
                    text: 'Ocorreu um erro inesperado!'
                }))
            })
            .then(res => {
                const comments = res.data.comments || []
                comments.push(payload.comment)

                // update some attributes of object, in this case update only comments
                axios.patch(`/posts/${payload.postId}.json?auth=${getState().user.token}`, { comments })
                    .catch(err => {
                        const teste = getState().user.token
                        debugger
                        dispatch(setMessage({
                            title: 'Erro',
                            text: 'Ocorreu um erro inesperado ao salvar o comentário!'
                        }))
                    })
                    .then(res => {
                        dispatch(fetchPosts())
                    })
            })
    }
}

export const setPosts = posts => {
    return {
        type: SET_POSTS,
        payload: posts
    }
}

export const fetchPosts = () => {
    return dispatch => {
        axios.get('/posts.json')
            .catch(err => {
                // if get some error dispatching to update view and setMessage with error
                dispatch(setMessage({
                    title: 'Erro',
                    text: 'Ocorreu um erro inesperado ao recuperar as informações!'
                }))
            })
            .then(res => {
                const rawPosts = res.data
                const posts = []
                for (let key in rawPosts) {
                    posts.push({
                        ...rawPosts[key],
                        id: key
                    })
                }
                // calling dispatch to setPosts with posts from server reversed (last first)
                dispatch(setPosts(posts.reverse()))
            })
    }
}

export const creatingPost = () => {
    return {
        type: CREATING_POSTS
    }
}

export const postCreated = () => {
    return {
        type: POST_CREATED
    }
}