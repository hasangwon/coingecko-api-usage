import { PayloadAction, createSlice } from "@reduxjs/toolkit";
export const globalSlice = createSlice({
  name: "global",
  initialState: {
    state: "",
  },
  reducers: {
    setState: (state, action: PayloadAction<string>) => {
      state.state = action.payload;
    },
  },
});

export const { setState } = globalSlice.actions;

export default globalSlice.reducer;
