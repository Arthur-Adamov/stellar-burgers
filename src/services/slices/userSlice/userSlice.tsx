import {
  getUserApi,
  loginUserApi,
  logoutApi,
  registerUserApi,
  TRegisterData,
  updateUserApi
} from '@api';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TLoginData } from '../../../utils/burger-api';
import { TUser } from '@utils-types';
import { deleteCookie, getCookie, setCookie } from '../../../utils/cookie';

type TUserState = {
  isAuthChecked: boolean;
  isAuthenticated: boolean;
  data: TUser | null;
  loginUserError: string | null | unknown;
  loginUserRequest: boolean;
};

export const loginUser = createAsyncThunk(
  'user/loginUser',
  async (data: TLoginData) => {
    const userData = await loginUserApi(data);
    setCookie('accessToken', userData.accessToken);
    localStorage.setItem('refreshToken', userData.refreshToken);
    return userData.user;
  }
);

export const registerUser = createAsyncThunk(
  'user/registerUser',
  async (data: TRegisterData) => {
    const userData = await registerUserApi(data);
    setCookie('accessToken', userData.accessToken);
    localStorage.setItem('refreshToken', userData.refreshToken);
    return userData.user;
  }
);

export const getUser = createAsyncThunk(
  'user/getUser',
  async () => await getUserApi()
);

export const updateUser = createAsyncThunk(
  'user/updateUser',
  async (user: TUser) => await updateUserApi(user)
);

export const logoutUser = createAsyncThunk(
  'user/logout',
  // (_, { dispatch }) => {
  async () => {
    logoutApi()
      .then(() => {
        localStorage.clear(); // очищаем refreshToken
        deleteCookie('accessToken'); // очищаем accessToken
        // dispatch(userLogout()); // удаляем пользователя из хранилища
      })
      .catch(() => {
        console.log('Ошибка выполнения выхода');
      });
  }
);

// export const checkUserAuth = createAsyncThunk(
//   'user/checkUser',
//   (_, { dispatch }) => {
//     if (getCookie('accessToken')) {
//       dispatch(getUser()).finally(() => {
//         dispatch(authChecked());
//       });
//     } else {
//       dispatch(authChecked());
//     }
//   }
// );

const initialState: TUserState = {
  isAuthChecked: false, // флаг для статуса проверки токена пользователя
  isAuthenticated: false,
  data: null,
  loginUserError: null,
  loginUserRequest: false
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    // authChecked: (state) => {
    //   state.isAuthChecked = true;
    // }
  },
  selectors: {
    dataSelector: (state) => state.data,
    isAuthCheckedSelector: (state) => state.isAuthChecked,
    isAuthenticatedSelector: (state) => state.isAuthenticated
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loginUserRequest = true;
        state.loginUserError = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loginUserRequest = false;
        state.loginUserError = action.payload;
        state.isAuthChecked = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.data = action.payload;
        state.loginUserRequest = false;
        state.isAuthenticated = true;
        state.isAuthChecked = true;
      })
      .addCase(registerUser.pending, (state) => {
        state.loginUserRequest = true;
        state.loginUserError = null;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loginUserRequest = false;
        state.loginUserError = action.error.message;
        state.isAuthChecked = true;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.data = action.payload;
        state.loginUserRequest = false;
        state.isAuthenticated = true;
        state.isAuthChecked = true;
      })
      .addCase(getUser.pending, (state) => {
        state.loginUserRequest = true;
        state.loginUserError = null;
      })
      .addCase(getUser.rejected, (state, action) => {
        state.loginUserRequest = false;
        state.loginUserError = action.error.message;
        state.isAuthChecked = true;
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.data = action.payload.user;
        state.loginUserRequest = false;
        state.isAuthenticated = true;
        state.isAuthChecked = true;
      })
      .addCase(updateUser.pending, (state) => {
        state.loginUserRequest = true;
        state.loginUserError = null;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.loginUserRequest = false;
        state.loginUserError = action.payload;
        state.isAuthChecked = true;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.data = action.payload.user;
        state.loginUserRequest = false;
        state.isAuthenticated = true;
        state.isAuthChecked = true;
      })
      .addCase(logoutUser.pending, (state) => {
        state.loginUserRequest = true;
        state.loginUserError = null;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.loginUserRequest = false;
        state.loginUserError = action.payload;
        state.isAuthChecked = true;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.data = null;
        state.loginUserRequest = false;
        state.isAuthenticated = false;
        state.isAuthChecked = true;
      });
  }
});

export const userReducer = userSlice.reducer;
export const { dataSelector, isAuthCheckedSelector, isAuthenticatedSelector } =
  userSlice.selectors;
