import { createSlice } from "@reduxjs/toolkit";
import { dispatch } from "@redux/store";
import axiosInstance from "@services/api-services/axios";
import errorHandle from "@services/api-services/errorHandle";

// ----------------------------------------------------------------------

const initialState: requestStateTypes = {
  isLoading: false,
  error: "",
  requests: [],
};

// ----------------------------------------------------------------------

const slice = createSlice({
  name: "request",
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

    // All REQUESTS DETAILS
    getRequestsSuccess(state, action) {
      state.isLoading = false;
      state.requests = action.payload.data;
    },

    // CLEAR REQUESTS
    clearRequests(state, action) {
      state.requests.filter((item) => item._id !== action.payload);
    },
  },
});

// Reducer
export default slice.reducer;

// Export Actions
export const { clearRequests } = slice.actions;

// ----------------------------------------------------------------------------

// getAllRequests API call
export const getAllRequests = () => async () => {
  dispatch(slice.actions.startLoading());
  try {
    const response = await axiosInstance.get("/user/requests/received");
    // console.log(response?.data, "getAllRequests response hlo ============");

    dispatch(
      slice.actions.getRequestsSuccess({
        data: response?.data?.data,
      })
    );

    return response?.data?.data;
  } catch (error) {
    const axiosError = error as AxiosErrorResponseTypes;
    errorHandle({ error: axiosError, label: "getAllRequests API Error:" });
    const errorData = axiosError?.response?.data as ErrorResponseTypes;
    dispatch(
      slice.actions.hasError({
        error: errorData || "Something went wrong",
      })
    );
  }
};

// Accept or Reject Request API call
export const reviewConnectionRequest =
  (payload: reviewRequestPayloadTypes) => async () => {
    // dispatch(slice.actions.startLoading());
    try {
      const response = await axiosInstance.post(
        `/request/review/${payload.status}/${payload.userId}`
      );
      // console.log(response?.data, "reviewRequest response hlo ============");

      return response;
    } catch (error) {
      const axiosError = error as AxiosErrorResponseTypes;
      errorHandle({ error: axiosError, label: "reviewRequest API Error:" });
      const errorData = axiosError?.response?.data as ErrorResponseTypes;
      dispatch(
        slice.actions.hasError({
          error: errorData || "Something went wrong",
        })
      );
    }
  };
