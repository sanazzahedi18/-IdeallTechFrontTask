import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store/store";

interface DarkModeState {
  mode: "light" | "dark";
}

const initialState: DarkModeState = {
  mode: "light",
};

const darkModeSlice = createSlice({
  name: "darkMode",
  initialState,
  reducers: {
    toggleDarkMode: (state: DarkModeState) => {
      if (state.mode === "light") {
        state.mode = "dark";
      } else if (state.mode === "dark") {
        state.mode = "light";
      }
    },
  },
});

export const { toggleDarkMode } = darkModeSlice.actions;
export default darkModeSlice.reducer;

export const selectDarkMode = (store: RootState): DarkModeState["mode"] =>
  store.darkMode.mode;
