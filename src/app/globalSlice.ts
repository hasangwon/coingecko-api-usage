import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Coin } from "../types/type";

interface GlobalState {
  coins: Coin[];
  viewMode: "전체보기" | "북마크 보기";
  vsCurrency: "krw" | "usd";
  perPage: 10 | 30 | 50;
}

const initialState: GlobalState = {
  coins: [],
  viewMode: "전체보기",
  vsCurrency: "krw",
  perPage: 50,
};

const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    setCoins(state, action: PayloadAction<Coin[]>) {
      state.coins = action.payload;
    },
    setViewMode(state, action: PayloadAction<"전체보기" | "북마크 보기">) {
      state.viewMode = action.payload;
    },
    setVsCurrency(state, action: PayloadAction<"krw" | "usd">) {
      state.vsCurrency = action.payload;
    },
    setPerPage(state, action: PayloadAction<string>) {
      const newValue = parseInt(action.payload);
      state.perPage = newValue as 10 | 30 | 50;
    },
    setInitializeFilter(state, action: PayloadAction<null>) {
      state.viewMode = "전체보기";
      state.vsCurrency = "krw";
      state.perPage = 50;
    },
  },
});

export const { setViewMode, setVsCurrency, setPerPage, setInitializeFilter, setCoins } = globalSlice.actions;
export default globalSlice.reducer;
