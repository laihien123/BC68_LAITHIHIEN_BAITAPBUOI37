import React from "react";
import { Space, Table, Tag } from "antd";
const TableSinhVien = ({
  arrSinhVien,
  handleDeleteSinhVien,
  handleEditSinhVien,
}) => {
  //const dataSource = arrSinhVien

  const columns = [
    {
      title: "MSSV",
      dataIndex: "mssv",
      key: "stt",
    },
    {
      title: "Tên sinh viên",
      dataIndex: "tenSinhVien",
      key: "age",
    },
    {
      title: "Số điện thoại",
      dataIndex: "soDienThoai",
      key: "address",
    },

    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "",
      render: (text, record, index) => {
        return (
          <>
            <button
              onClick={() => {
                handleDeleteSinhVien(record.mssv);
              }}
              className="py-2 px-5 bg-red-500 text-white rounded-md"
            >
              Delete
            </button>
            <button
              onClick={() => {
                handleEditSinhVien(record);
              }}
              className="py-2 px-5 bg-yellow-500 rounded-md ml-3"
            >
              Edit
            </button>
          </>
        );
      },
    },
  ];
  return <Table columns={columns} dataSource={arrSinhVien} />;
};

export default TableSinhVien;
