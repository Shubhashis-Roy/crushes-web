import { createSlice } from "@reduxjs/toolkit";
import { dispatch } from "@redux/store";
import axiosInstance from "@services/api-services/axios";
import errorHandle from "@services/api-services/errorHandle";

// ----------------------------------------------------------------------

const initialState: userStateTypes = {
  isLoading: false,
  error: "",
  profileDetails: {
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

    // PROFILE DETAILS
    getProfileSuccess(state, action) {
      state.isLoading = false;
      state.profileDetails = action.payload.profileDetails;
    },
  },
});

// Reducer
export default slice.reducer;

// ----------------------------------------------------------------------------

// Profile API call
export const profile = () => async () => {
  dispatch(slice.actions.startLoading());
  try {
    const response = await axiosInstance.get("/profile/view");

    console.log(response?.data, "profile response hlo ============");

    // dispatch(
    //   slice.actions.getProfileSuccess({
    //     profileDetails: response?.data?.response?.user,
    //   })
    // );
  } catch (error) {
    const axiosError = error as AxiosErrorResponseTypes;
    errorHandle({ error: axiosError, label: "profile API Error:" });
    const errorData = axiosError?.response?.data as ErrorResponseTypes;
    dispatch(
      slice.actions.hasError({
        error: axiosError?.response?.data || "Something went wrong",
      })
    );
  }
};
