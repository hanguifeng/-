const reducer = (state = {}, action) => {
  switch(action.type) {
    case 'set_menu':
      return {
        ...state,
        key: action.key,
      }
    default:
      return state;
  }
}

export default reducer;