const reducer = (state = {}, action) => {
  switch(action.type) {
    case 'sign_in':
      return {
        ...state,
        loginState: true,
        userID: action.userID,
      }
    case 'sign_out':
      return {
        ...state,
        loginState: false,
      }
    default:
      return state;
  }
}

export default reducer;