import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import InputCustom from "./InputCustom";
import * as yup from "yup";
import TableSinhVien from "./TableSinhVien";
import { useDispatch, useSelector } from "react-redux";
import sinhVienSlice, {
  capNhatSinhVien,
  themSinhVien,
  xoaSinhVien,
  timKiemSinhVien,
} from "../redux/sinhVienSlice";

const MyForm = () => {
  const [arrSinhVien, setArrSinhVien] = useState([]);
  const [editingSinhVien, setEditingSinhVien] = useState(null);
  const { sinhVien } = useSelector((state) => state.sinhVienSlice);
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      mssv: "",
      tenSinhVien: "",
      soDienThoai: "",
      email: "",
    },
    validationSchema: yup.object({
      mssv: yup
        .string()
        .required("Vui lòng không được bỏ trống")
        .length(6, "Vui lòng nhập đúng 6 ký tự"),
      tenSinhVien: yup
        .string()
        .required("Vui lòng không được bỏ trống")
        .matches(
          /^[A-Za-zÀ-ỹà-ỹ-Z\s]+$/,
          "Vui lòng nhập tên không phải chữ số"
        ),
      soDienThoai: yup
        .string()
        .required("Vui lòng không được bỏ trống")
        .matches(
          /^(0|\+84)(3|5|7|8|9)[0-9]{8}$/,
          "Vui lòng nhập đúng định dạng số điện thoại"
        ),
      email: yup
        .string()
        .required("Vui lòng không được bỏ trống")
        .email("Vui lòng nhập định dạng email"),
    }),
    onSubmit: (values, { resetForm }) => {
      const isDuplicate = sinhVien.some(
        (sv) =>
          sv.mssv === values.mssv ||
          sv.tenSinhVien === values.tenSinhVien ||
          sv.soDienThoai === values.soDienThoai ||
          sv.email === values.email
      );

      if (editingSinhVien) {
        dispatch(capNhatSinhVien(values));
        setEditingSinhVien(null);
      } else {
        dispatch(themSinhVien(values));
      }

      setArrSinhVien((prev) => [...prev, values]);
      resetForm();
    },
  });

  useEffect(() => {
    setArrSinhVien(sinhVien);
  }, [sinhVien]);

  useEffect(() => {
    if (editingSinhVien) {
      formik.setValues(editingSinhVien);
    }
  }, [editingSinhVien]);

  const handleDeleteSinhVien = (mssv) => {
    dispatch(xoaSinhVien(mssv));
    setArrSinhVien((prev) => prev.filter((sv) => sv.mssv !== mssv));
  };

  const handleEditSinhVien = (sinhVien) => {
    setEditingSinhVien(sinhVien);
  };

  const handleSearchSinhVien = (event) => {
    dispatch(timKiemSinhVien(event.target.value));
  };

  return (
    <>
      <h2 className=" px-28 py-5 text-3xl bg-gray-800 text-white">
        Thông Tin Sinh Viên
      </h2>
      <div className="container mt-5">
        <form onSubmit={formik.handleSubmit}>
          <div className="grid grid-cols-2 gap-5">
            {["mssv", "tenSinhVien", "soDienThoai", "email"].map((field) => (
              <InputCustom
                key={field}
                contentLabel={field}
                placeHolder={`Vui lòng nhập ${field}`}
                name={field}
                onChange={formik.handleChange}
                value={formik.values[field]}
                onBlur={formik.handleBlur}
                errors={formik.errors[field]}
                touched={formik.touched[field]}
              />
            ))}
            <div className="space-x-5">
              <button
                type="submit"
                className="py-2 px-5 bg-green-500 text-white rounded-lg"
              >
                {editingSinhVien ? "Cập nhật Sinh Viên" : "Thêm Sinh Viên"}
              </button>
              <button
                type="button"
                className="py-2 px-5 bg-red-500 text-white rounded-lg"
                onClick={formik.handleReset}
              >
                Reset Form
              </button>
            </div>
          </div>
        </form>
      </div>
      <div className="container mt-6 grid grid-cols-12 gap-4">
        <div className="form-group col-span-10">
          <input
            placeholder="Nhập mã sinh viên để tìm kiếm sinh viên"
            type="text"
            className="form-control bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
            onChange={handleSearchSinhVien}
          />
        </div>
        <div className="col-span-1">
          <button className="bg-blue-500 text-white py-2 px-5 text-center rounded-lg">
            Search
          </button>
        </div>
      </div>
      <div className="container mt-6">
        <TableSinhVien
          handleDeleteSinhVien={handleDeleteSinhVien}
          arrSinhVien={arrSinhVien}
          handleEditSinhVien={handleEditSinhVien}
        />
      </div>
    </>
  );
};

export default MyForm;
