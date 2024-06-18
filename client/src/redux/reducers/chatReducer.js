const initialState = {
    messages: [],
    socket: null,
  };
  
  const chatReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'SET_MESSAGES':
        return { ...state, messages: action.payload };
      case 'SET_SOCKET':
        return { ...state, socket: action.payload };
      default:
        return state;
    }
  };
  
  export default chatReducer;
  