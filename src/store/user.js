import { USER_GET } from "../Api";
import createAsyncSlice from "./helper/createAsyncSlice";
import { fecthToken, resetTokenState, fetchError } from "./token";

const slice = createAsyncSlice({
  name: "user",
  fetchConfig: (token) => USER_GET(token),
});

export const fecthUser = slice.asyncAction;
export const { resetState: resetUserState } = slice.actions;

export const userLogin = (user) => async (dispatch) => {
  const { payload } = await dispatch(fecthToken(user));
  if (payload.token) {
    window.localStorage.setItem("token", payload.token);
    await dispatch(fecthUser(payload.token));
  }
};

export const userLogout = () => (dispatch) => {
  dispatch(resetUserState());
  dispatch(resetTokenState());
  window.localStorage.removeItem("token");
};
export const autoLogin = () => async (dispatch, getState) => {
  const { token } = getState();
  if (token?.data?.token) {
    const { type } = await dispatch(fecthUser(token.data.token));
    if (type === fetchError.type) dispatch(userLogout);
  }
};

export default slice.reducer;
