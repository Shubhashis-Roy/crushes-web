import { createSlice } from "@reduxjs/toolkit";
import { dispatch } from "@redux/store";
import axiosInstance from "@services/api-services/axios";
import errorHandle from "@services/api-services/errorHandle";

// ----------------------------------------------------------------------

const initialState: authStateTypes = {
  isLoading: false,
  error: "",
  userDetails: {
    _id: "",
    firstName: "",
    lastName: "",
    emailId: "",
    dateOfBirth: "",
    city: "",
    gender: "",
    interest: "",
    photoUrl: [],
    createdAt: "",
    updatedAt: "",
    __v: 0,
  },
  // statusCode: "",
};

// ----------------------------------------------------------------------

const slice = createSlice({
  name: "auth",
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

    // USER DETAILS
    getUserDetailsSuccess(state, action) {
      state.isLoading = false;
      state.userDetails = action.payload.userDetails;
    },
  },
});

// Reducer
export default slice.reducer;
// Export Actions
// export const {} = slice.actions;

// ----------------------------------------------------------------------------

// Signup API call
export const signup = (payload: signUpPayloadTypes) => async () => {
  dispatch(slice.actions.startLoading());
  try {
    const response = await axiosInstance.post("/signup", payload);

    console.log(response?.data, "signup response hlo ============");

    // dispatch(
    //   slice.actions.getUserDetailsSuccess({
    //     userDetails: response?.data?.response?.user,
    //   })
    // );
  } catch (error) {
    const axiosError = error as AxiosErrorResponseTypes;
    errorHandle({ error: axiosError, label: "signup API Error:" });
    const errorData = axiosError?.response?.data as ErrorResponseTypes;
    dispatch(
      slice.actions.hasError({
        error: axiosError?.response?.data || "Something went wrong",
      })
    );
  }
};
