import { TOKEN_POST } from "../Api";
import createAsyncSlice from "./helper/createAsyncSlice";

const slice = createAsyncSlice({
  name: "token",
  initialState: {
    data: {
      token: window.localStorage.getItem("token") || null,
    },
  },
  fetchConfig: (user) => TOKEN_POST(user),
});

export const { resetState: resetTokenState, fetchError } = slice.actions;

export const fecthToken = slice.asyncAction;
export default slice.reducer;
