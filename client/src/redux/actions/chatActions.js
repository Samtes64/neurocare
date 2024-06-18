import { getMessages } from '../../utils/api';

export const fetchMessages = (from, to) => async (dispatch) => {
  const { data } = await getMessages(from, to);
  dispatch({ type: 'SET_MESSAGES', payload: data });
};

export const sendMessage = (message) => async (dispatch, getState) => {
  const { socket } = getState().chat;
  socket.emit('sendMessage', message);
};
