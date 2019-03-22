import { SET_MESSAGE } from '../actions/actionTypes'

const initialState = {
    title: '',
    text: ''
}

const reducder = (state = initialState, action) => {
    switch (action.type) {
        case SET_MESSAGE:
            return {
                ...state,
                title: action.payload.title,
                text: action.payload.text
            }
        default:
            return state
    }
}

export default reducder