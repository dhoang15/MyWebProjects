import React from 'react';
import toast from 'react-hot-toast';

const HistoryRow = ({ data }) => {
  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    toast.success("Đã copy thông tin!");
  };

  return (
    <tr className="border-b hover:bg-gray-50 transition-all group">
      <td className="p-4 font-bold text-gray-800">{data.username_acc}</td>
      <td 
        className="p-4 font-mono text-red-600 font-bold bg-red-50 cursor-pointer hover:bg-red-100 relative"
        onClick={() => handleCopy(data.password_acc)}
        title="Bấm để copy mật khẩu"
      >
        {data.password_acc}
        <span className="hidden group-hover:inline ml-2 text-[8px] text-gray-400 font-normal italic">(Copy)</span>
      </td>
      <td className="p-4 font-black">{data.price?.toLocaleString()}đ</td>
      <td className="p-4 text-xs text-gray-500 font-bold">
        {new Date(data.buy_date).toLocaleString()}
      </td>
    </tr>
  );
};

export default HistoryRow;