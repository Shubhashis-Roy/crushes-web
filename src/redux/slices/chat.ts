import { createSlice } from "@reduxjs/toolkit";
import { dispatch } from "@redux/store";
import axiosInstance from "@services/api-services/axios";
import errorHandle from "@services/api-services/errorHandle";

// ----------------------------------------------------------------------

const initialState: chatStateTypes = {
  isLoading: false,
  error: "",
  //   chatUserList: [
  //     {
  //       _id: "68f937044a2cea1cd6d48260",
  //       firstName: "Boshis",
  //       lastName: "Roy",
  //       city: "Siliguri",
  //       photoUrl: [
  //         "https://previews.123rf.com/images/aberrantrealitie…-man-wearing-a-hat-and-sunglasses-in-the-snow.jpg",
  //         "https://previews.123rf.com/images/aberrantrealitie…-man-wearing-a-hat-and-sunglasses-in-the-snow.jpg",
  //         "https://previews.123rf.com/images/aberrantrealitie…-man-wearing-a-hat-and-sunglasses-in-the-snow.jpg",
  //       ],
  //     },
  //   ],
  // };
  chatUserList: [],
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
      // state.chatUserList = [...state.chatUserList, ...action.payload.data];
      state.chatUserList = action.payload.data;
    },

    addChatUser(state, action) {
      const exists = state.chatUserList.some(
        (item) => JSON.stringify(item) === JSON.stringify(action.payload.data)
      );

      if (!exists) {
        state.chatUserList.unshift(action.payload.data);
      }
    },
  },
});

// Reducer
export default slice.reducer;
// Export Actions
export const { addChatUser } = slice.actions;

// ----------------------------------------------------------------------------

// getChatUserList API call
export const getChatUserList = () => async () => {
  dispatch(slice.actions.startLoading());
  try {
    const response = await axiosInstance.get("/chat/users-list");
    // console.log(response?.data, "getChatUserList response hlo ============");

    // dispatch(
    //   slice.actions.getChatUserListSuccess({
    //     data: response?.data?.users,
    //   })
    // );

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
