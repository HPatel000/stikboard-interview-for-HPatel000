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
    default:
      return state
  }
}
