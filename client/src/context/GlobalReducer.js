export default (state, action) => {
  switch (action.type) {
    case 'SIGNUP_USER':
    case 'LOGIN_USER':
      console.log(action.payload)
      return {
        ...state,
        user: action.payload,
      }
    case 'ERROR':
      console.log(action.payload)
      return {
        ...state,
        error: action.payload,
      }
    case 'REMOVE_ERROR':
      return {
        ...state,
        error: null,
      }
    case 'LOGOUT':
      return {
        ...state,
        user: null,
      }
    case 'SET_LOADING':
      return {
        ...state,
        loading: action.payload,
      }
    default:
      return state
  }
}
