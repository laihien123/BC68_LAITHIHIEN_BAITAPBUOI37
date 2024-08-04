import { configureStore } from "@reduxjs/toolkit";
import sinhVienSlice from "./sinhVienSlice";

export const store = configureStore({
  reducer: {
    ten: () => "lai hien",
    sinhVienSlice,
  },
});
