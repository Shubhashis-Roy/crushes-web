import { createSlice } from "@reduxjs/toolkit";
import { dispatch } from "@redux/store";
import axiosInstance from "@services/api-services/axios";
import errorHandle from "@services/api-services/errorHandle";

// ----------------------------------------------------------------------

const initialState: connectionStateTypes = {
  isLoading: false,
  error: "",
  connections: [],
  interestConnections: {
    _id: "",
    fromUserId: "",
    toUserId: "",
    status: "",
    createdAt: "",
  },
  ignoreConnections: {
    _id: "",
    fromUserId: "",
    toUserId: "",
    status: "",
    createdAt: "",
  },
};

// ----------------------------------------------------------------------

const slice = createSlice({
  name: "connection",
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

    // All CONNECTIONS DETAILS
    getConnectionsSuccess(state, action) {
      state.isLoading = false;
      state.connections = action.payload.data;
    },

    // ADD INTERESTED USER
    getInterestedUserSuccess(state, action) {
      state.isLoading = false;
      state.interestConnections = action.payload.data;
    },
  },
});

// Reducer
export default slice.reducer;

// ----------------------------------------------------------------------------

// getAllConnections API call
export const getAllConnections = () => async () => {
  dispatch(slice.actions.startLoading());
  try {
    const response = await axiosInstance.get("/user/connections");
    // console.log(response?.data, "getAllConnections response hlo ============");

    dispatch(
      slice.actions.getConnectionsSuccess({
        data: response?.data?.data,
      })
    );

    return response?.data?.data;
  } catch (error) {
    const axiosError = error as AxiosErrorResponseTypes;
    errorHandle({ error: axiosError, label: "getAllConnections API Error:" });
    const errorData = axiosError?.response?.data as ErrorResponseTypes;
    dispatch(
      slice.actions.hasError({
        error: axiosError?.response?.data || "Something went wrong",
      })
    );
  }
};

// Send request for interest/ignore
export const sendRequest =
  (sendRequestParams: sendRequestParamsType) => async () => {
    try {
      const response = await axiosInstance.post(
        `/request/send/${sendRequestParams.status}/${sendRequestParams.id}`
      );
      // console.log(response?.data, "send req hlo ===========");

      if (sendRequestParams?.status === "interested") {
        dispatch(
          slice.actions.getInterestedUserSuccess({
            data: response?.data?.data,
          })
        );
      }

      return response;
    } catch (error) {
      const axiosError = error as AxiosErrorResponseTypes;
      errorHandle({ error: axiosError, label: "sendRequest API Error:" });
      const errorData = axiosError?.response?.data as ErrorResponseTypes;
      dispatch(
        slice.actions.hasError({
          error: axiosError?.response?.data || "Something went wrong",
        })
      );
    }
  };
