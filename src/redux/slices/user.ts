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
    interest: [],
    photoUrl: [],
    createdAt: "",
    updatedAt: "",
    __v: 0,
  },
  updatedProfileDetails: {
    _id: "",
    firstName: "",
    lastName: "",
    emailId: "",
    dateOfBirth: "",
    city: "",
    gender: "",
    interest: [],
    photoUrl: [],
    createdAt: "",
    updatedAt: "",
    __v: 0,
  },
};

// ----------------------------------------------------------------------

const slice = createSlice({
  name: "user",
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
      state.profileDetails = action.payload.data;
    },

    //UPDATED PROFILE DETAILS
    updateProfileSuccess(state, action) {
      state.isLoading = false;
      state.updatedProfileDetails = action.payload.data;
    },
  },
});

// Reducer
export default slice.reducer;

// ----------------------------------------------------------------------------

// Profile API call
export const getProfile = () => async () => {
  dispatch(slice.actions.startLoading());
  try {
    const response = await axiosInstance.get("/profile/view");

    // console.log(response?.data, "profile response hlo ============");

    dispatch(
      slice.actions.getProfileSuccess({
        date: response?.data,
      })
    );
    return response?.data;
  } catch (error) {
    const axiosError = error as AxiosErrorResponseTypes;
    errorHandle({ error: axiosError, label: "getProfile API Error:" });
    const errorData = axiosError?.response?.data as ErrorResponseTypes;
    dispatch(
      slice.actions.hasError({
        error: errorData || "Something went wrong",
      })
    );
  }
};

// Update Profile API call
export const updateUserProfile =
  (payload: updateProfilePayloadTypes) => async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axiosInstance.patch("/profile/edit", payload);

      // console.log(response?.data, "update profile response hlo ============");

      dispatch(
        slice.actions.updateProfileSuccess({
          data: response?.data,
        })
      );

      return response;
    } catch (error) {
      const axiosError = error as AxiosErrorResponseTypes;
      errorHandle({ error: axiosError, label: "updateUserProfile API Error:" });
      const errorData = axiosError?.response?.data as ErrorResponseTypes;
      dispatch(
        slice.actions.hasError({
          error: errorData || "Something went wrong",
        })
      );
    }
  };

//Upload photo
export const uploadPhotos = (files: File[]) => async () => {
  try {
    const formData = new FormData();

    files.forEach((file) => {
      formData.append("photo", file);
    });

    const response = await axiosInstance.post(
      "/profile/upload-photos",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    // console.log(response?.data, "uploadPhotos res hlo ============");

    return response;
  } catch (error) {
    const axiosError = error as AxiosErrorResponseTypes;
    errorHandle({ error: axiosError, label: "uploadPhotos API Error:" });
    const errorData = axiosError?.response?.data as ErrorResponseTypes;
    dispatch(
      slice.actions.hasError({
        error: errorData || "Something went wrong",
      })
    );
  }
};
