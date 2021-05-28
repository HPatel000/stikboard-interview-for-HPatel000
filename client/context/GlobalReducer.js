export default (state, action) => {
  switch (action.type) {
    case SIGNUP_USER:
    case LOGIN_USER:
      return {
        ...state,
        user: action.payload,
      }
    case ERROR:
      return {
        ...state,
        error: action.payload,
      }
    default:
      return state
  }
}
