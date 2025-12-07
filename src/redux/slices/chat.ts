import { createSlice } from "@reduxjs/toolkit";
import { dispatch } from "@redux/store";
import axiosInstance from "@services/api-services/axios";
import errorHandle from "@services/api-services/errorHandle";

// ----------------------------------------------------------------------

const initialState: chatStateTypes = {
  isLoading: false,
  error: "",
  startChat: {
    _id: "",
    firstName: "",
    lastName: "",
    city: "",
    photoUrl: [],
  },
  chatUserList: [],
  newStartChat: {
    _id: "",
    firstName: "",
    lastName: "",
    photoUrl: [],
    emailId: "",
    dateOfBirth: "",
    city: "",
    gender: "",
    interest: "",
    bio: "",
  },
};

// ----------------------------------------------------------------------

const slice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    // START LOADING
    startLoading(state) {
      state.isLoading = true;
    },

    // HAS ERROR
    hasError(state, action) {
      state.error = action.payload.error;
    },

    // CHAT USER LIST
    getChatUserListSuccess(state, action) {
      state.isLoading = false;
      state.chatUserList = action.payload.data;
    },

    // START CHAT
    addChattingUser(state, action) {
      state.newStartChat = action.payload;
    },

    // CLEAR CHAT
    clearChattingUser(state) {
      state.newStartChat = {
        _id: "",
        firstName: "",
        lastName: "",
        photoUrl: [],
        emailId: "",
        dateOfBirth: "",
        city: "",
        gender: "",
        interest: "",
        bio: "",
      };
    },
  },
});

// Reducer
export default slice.reducer;
// Export Actions
export const { addChattingUser, clearChattingUser } = slice.actions;

// ----------------------------------------------------------------------------

// getChatUserList API call
export const getChatUserList = () => async () => {
  dispatch(slice.actions.startLoading());
  try {
    const response = await axiosInstance.get("/chat/users-list");
    // console.log(response?.data, "getChatUserList response hlo ============");

    const result = response?.data?.users?.filter(Boolean);

    dispatch(
      slice.actions.getChatUserListSuccess({
        data: result,
      })
    );

    return response?.data?.users;
  } catch (error) {
    const axiosError = error as AxiosErrorResponseTypes;
    errorHandle({ error: axiosError, label: "getChatUserList API Error:" });
    const errorData = axiosError?.response?.data as ErrorResponseTypes;
    dispatch(
      slice.actions.hasError({
        error: errorData || "Something went wrong",
      })
    );
  }
};

// Get chat messages API call
export const getChatMessages = (targetUserId: string) => async () => {
  // dispatch(slice.actions.startLoading());
  try {
    const response = await axiosInstance.get(`/chat/${targetUserId}`);

    // console.log(response?.data, "getChatMessages response hlo ============");

    return response?.data?.messages;
  } catch (error) {
    const axiosError = error as AxiosErrorResponseTypes;
    errorHandle({ error: axiosError, label: "getChatMessages API Error:" });
    const errorData = axiosError?.response?.data as ErrorResponseTypes;
    dispatch(
      slice.actions.hasError({
        error: errorData || "Something went wrong",
      })
    );
  }
};
