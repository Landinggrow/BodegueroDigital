import React from "react";

const Button = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="text-white bg-[#E49542] hover:bg-[#854937] font-medium rounded-full text-[20px] px-10 py-2 sm:px-16 text-center transition-all"
    >
      Probar Demo
    </button>
  );
};

export default Button;
