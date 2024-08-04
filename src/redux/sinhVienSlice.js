import { createSlice, current } from "@reduxjs/toolkit";
import { removeVietnameseTones } from "../util/removeVietnameseTones";

const initialState = {
  sinhVien: [],
  originalSinhVien: [],
};

const sinhVienSlice = createSlice({
  name: "sinhVien",
  initialState,
  reducers: {
    themSinhVien: (state, action) => {
      console.log(current(state));
      const sinhVienMoi = action.payload;
      state.sinhVien.push(sinhVienMoi);
      state.originalSinhVien.push(sinhVienMoi);
    },
    xoaSinhVien: (state, action) => {
      const viTri = state.sinhVien.findIndex(
        (sv) => sv.mssv === action.payload
      );
      console.log(viTri);
      if (viTri !== -1) {
        state.sinhVien.splice(viTri, 1);
        state.originalSinhVien.splice(viTri, 1);
      }
    },
    capNhatSinhVien: (state, action) => {
      const sinhVienCapNhat = action.payload;
      const viTri = state.sinhVien.findIndex(
        (sv) => sv.mssv === sinhVienCapNhat.mssv
      );
      if (viTri !== -1) {
        state.sinhVien[viTri] = sinhVienCapNhat;
        state.originalSinhVien[viTri] = sinhVienCapNhat;
      }
    },
    timKiemSinhVien: (state, action) => {
      const timKiem = removeVietnameseTones(action.payload.toLowerCase());
      state.sinhVien = state.originalSinhVien.filter((sv) =>
        removeVietnameseTones(sv.mssv.toLowerCase()).includes(timKiem)
      );
    },
  },
});

export const { themSinhVien, xoaSinhVien, capNhatSinhVien, timKiemSinhVien } =
  sinhVienSlice.actions;

export default sinhVienSlice.reducer;
