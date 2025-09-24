import { createSlice } from "@reduxjs/toolkit";

const chatSlice = createSlice({
  name: "chat",
  initialState: {
    chatList: [],
  },
  reducers: {
    addChatList: (state, action) => {
      state.chatList = action.payload;
    },
  },
});

export const { addChatList } = chatSlice.actions;

export default chatSlice.reducer;
