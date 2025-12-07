import { createSlice } from "@reduxjs/toolkit";
import { dispatch } from "@redux/store";
import axiosInstance from "@services/api-services/axios";
import errorHandle from "@services/api-services/errorHandle";

// ----------------------------------------------------------------------

const initialState: feedStateTypes = {
  isLoading: false,
  error: "",
  feedDetails: [],
};

// ----------------------------------------------------------------------

const slice = createSlice({
  name: "feed",
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

    // FEED DETAILS
    getFeedSuccess(state, action) {
      state.isLoading = false;
      state.feedDetails = action.payload.data;
    },
  },
});

// Reducer
export default slice.reducer;

// ----------------------------------------------------------------------------

// Feed API call
export const getFeed = () => async () => {
  dispatch(slice.actions.startLoading());
  try {
    const response = await axiosInstance.get("/user/feed");
    // console.log(response?.data, "feed response hlo ============");

    dispatch(
      slice.actions.getFeedSuccess({
        data: response?.data?.data,
      })
    );

    return response?.data?.data;
  } catch (error) {
    const axiosError = error as AxiosErrorResponseTypes;
    errorHandle({ error: axiosError, label: "feed API Error:" });
    const errorData = axiosError?.response?.data as ErrorResponseTypes;
    dispatch(
      slice.actions.hasError({
        error: errorData || "Something went wrong",
      })
    );
  }
};
