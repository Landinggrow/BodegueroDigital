import React from "react";

const Button = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="text-white bg-[#4673A6] hover:bg-[#7A9EC6] font-medium rounded-full text-[20px] px-10 py-2 sm:px-16 text-center transition-all"
    >
      Probar Demo
    </button>
  );
};

export default Button;
