import React from "react";

const Error = () => {
  return (
    <div className="w-full h-full flex flex-col items-center ">
      <p className="font-semibold">에러가 발생했습니다.</p>
      <div className="mt-4">
        <button
          className="mt-2 p-4 border rounded-lg bg-gray-100"
          onClick={() => {
            window.location.reload();
          }}
        >
          새로고침
        </button>
      </div>
    </div>
  );
};

export default Error;
