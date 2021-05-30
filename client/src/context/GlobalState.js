import React, { useReducer } from 'react'
import GlobalReducer from './GlobalReducer'
import GlobalContext from './GlobalContext'
import axios from 'axios'

const GlobalState = props => {
  const initailState = {
    user: null,
    loading: false,
    error: null,
  }

  const [state, dispatch] = useReducer(GlobalReducer, initailState)

  const userSignup = async (email, password) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    }

    try {
      const res = await axios.post(
        '/auth/signup',
        JSON.stringify({ email, password }),
        config
      )
      dispatch({
        type: 'SIGNUP_USER',
        payload: res.data,
      })
    } catch (err) {
      dispatch({
        type: 'ERROR',
        payload: err.response.data.msg,
      })
      setTimeout(() => dispatch({ type: 'REMOVE_ERROR' }), 4000)
    }
  }

  const userLogin = async (email, password) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    }

    try {
      const res = await axios.post(
        '/auth/signin',
        JSON.stringify({ email, password }),
        config
      )
      dispatch({
        type: 'LOGIN_USER',
        payload: res.data,
      })
    } catch (err) {
      dispatch({
        type: 'ERROR',
        payload: err.response.data.msg,
      })
      setTimeout(() => dispatch({ type: 'REMOVE_ERROR' }), 4000)
    }
  }

  const logout = () => {
    dispatch({
      type: 'LOGOUT',
    })
  }

  const setloading = data => {
    dispatch({
      type: 'SET_LOADING',
      payload: data,
    })
  }

  return (
    <GlobalContext.Provider
      value={{
        user: state.user,
        loading: state.loading,
        error: state.error,
        userSignup,
        userLogin,
        logout,
        setloading,
      }}
    >
      {props.children}
    </GlobalContext.Provider>
  )
}

export default GlobalState
