import {
    ADD_COMMENT,
    SET_POSTS,
    CREATING_POSTS,
    POST_CREATED 
} from './actionTypes'

import axios from 'axios'

//method called or dispatch called the ui will updated

export const addPost = post => {
    return dispatch => {
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
            .catch(err => console.log(err))
            .then(res => {
                // taking the return of function on firebase with url of image
                post.image = res.data.imageUrl
                
                // posting to post.json
                axios.post('/posts.json', { ...post })
                    .catch(err => console.log(err))
                    .then(res => {
                        dispatch(fetchPosts())
                        dispatch(postCreated())
                    })
            })
    }
}

export const addComment = payload => {
    return dispatch => {
        axios.get(`/posts/${payload.postId}.json`)
            .catch(err => console.log(err))
            .then(res => {
                const comments = res.data.comments || []
                comments.push(payload.comment)

                // update some attributes of object, in this case update only comments
                axios.patch(`/posts/${payload.postId}.json`, { comments })
                    .catch(err => console.log(err))
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
            .catch(err => console.log(err))
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