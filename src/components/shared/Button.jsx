import React from "react";

const Button = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="text-white bg-[#0078D4] hover:bg-[#005597] font-medium rounded-full text-[20px] px-10 py-2 sm:px-16 text-center transition-all"
    >
      Probar Demo
    </button>
  );
};

export default Button;
