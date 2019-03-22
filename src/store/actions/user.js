import {
	USER_LOGGED_IN,
	USER_LOGGED_OUT,
	LOADING_USER,
	USER_LOADED
} from './actionTypes'
import axios from 'axios'
import { setMessage } from "./message"; 


const authBaseURL = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty'
const API_KEY = "API_KEY";

export const userLogged = user => {
    return {
        type: USER_LOGGED_IN,
        payload: user
    }
}

export const logout = () => {
    return {
        type: USER_LOGGED_OUT
    }
}

export const createUser = (user) => {
    return dispatch => {
        axios.post(`${authBaseURL}/signupNewUser?key=${API_KEY}`,
            {
              email: user.email,
              password: user.password,
              returnSecureToken: true
            })
          .catch(err => {
            // if get some error dispatching to update view and setMessage with error
            dispatch(setMessage({
              title: 'Erro',
              text: 'Ocorreu um erro inesperado!'
            }))
          })
          .then(res => {
            if (res.data.localId) {
              axios.put(`/users/${res.data.localId}.json`, {
                  name: user.name 
                })
                .catch(err => {
                  // if get some error dispatching to update view and setMessage with error
                  dispatch(setMessage({
                    title: 'Erro',
                    text: 'Ocorreu um erro inesperado!'
                  }))
                })
                .then(res => {
                  // if get some error dispatching to update view and setMessage with error
                  dispatch(setMessage({
                    title: 'Sucesso',
                    text: 'Usuário criado com sucesso!'
                  }))
                });
            }
          });
    }
}

export const loadingUser = () => {
  return {
    type: LOADING_USER
  }
}

export const userLoaded = () => {
  return {
    type: USER_LOADED
  }
}

export const login = user => {
  return dispatch => {
    // dispatching to loadingUser update ui 
    dispatch(loadingUser())
    axios.post(`${authBaseURL}/verifyPassword?key=${API_KEY}`, {
      email: user.email,
      password: user.password,
      returnSecureToken: true
    })
      .catch(err => {
        // if get some error dispatching to update view and setMessage with error
        dispatch(setMessage({
          title: 'Erro',
          text: 'Ocorreu um erro inesperado!'
        }))
      })
      .then(res => {
        if (res.data.localId) { 
          axios.get(`/users/${res.data.localId}.json`)
            .catch(err => {
              // if get some error dispatching to update view and setMessage with error
              dispatch(setMessage({
                title: 'Erro',
                text: 'Ocorreu um erro inesperado!'
              }))
            })
            .then(res => {
              	user.password = null
                user.name = res.data.name
                dispatch(userLogged(user))
                dispatch(userLoaded())
            })
        }
      })
  }
}

