import React, { useState } from "react";

const Modal = ({ isOpen, onClose }) => {
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState([]);

  const toggleDropdown = (dropdown) => {
    setActiveDropdown((prev) => (prev === dropdown ? null : dropdown));
  };

  const handleOptionChange = (event) => {
    const value = event.target.value;
    if (event.target.checked) {
      setSelectedOptions((prev) => [...prev, value]);
    } else {
      setSelectedOptions((prev) => prev.filter((option) => option !== value));
    }
  };

  const handleClose = () => {
    setSelectedOptions([]);
    setActiveDropdown(null);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/55">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <div className="flex justify-between gap-2 items-center">
          <h2 className="text-2xl text-left font-bold mb-4">
            Inscríbete para una Demostración online
          </h2>
          <button
            type="button"
            className="bg-gray-200 hover:bg-gray-300 px-2 py-2 mb-2 rounded-md"
            onClick={handleClose}
          >
            <svg
              class="w-6 h-6 text-gray-800 "
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18 17.94 6M18 18 6.06 6"
              />
            </svg>
          </button>
        </div>

        <form>
          {/* Campo: Nombre completo */}
          <label className="block text-[15px] text-left font-medium text-gray-700 mb-2">
            Nombre completo:
            <input
              type="text"
              name="name"
              placeholder="Ingresa tu nombre"
              className="w-full bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded-md text-left"
              required
            />
          </label>

          {/* Campo: Correo electrónico */}
          <label className="block text-[15px] text-left font-medium text-gray-700 mb-2">
            Correo electrónico:
            <input
              type="email"
              name="email"
              placeholder="ejemplo@gmail.com"
              className="w-full bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded-md text-left"
              required
            />
          </label>

          {/* Campo: Nombre de tu restaurante o negocio */}
          <div>
            <label className="text-[15px] font-medium text-gray-700 mb-2 flex justify-between text-left">
              <span>Nombre de tu restaurante o negocio:</span>
              <span className="text-[#E49542] text-sm">(Opcional)</span>
            </label>
            <input
              type="text"
              name="businessName"
              placeholder='"Paladar Selecto"'
              className="w-full bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded-md"
              required
            />
          </div>

          {/* Dropdown dinámico: ¿Qué tipo de negocio tienes? */}
          <label className="text-[16px] text-left font-medium text-gray-700 mb-2 flex justify-between">
            ¿Qué tipo de negocio tienes?
            <span className="text-[#E49542] text-sm">(Opcional)</span>
          </label>
          <div className="relative">
            <button
              type="button"
              onClick={() => toggleDropdown("businessType")}
              className="w-full bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded-md text-left mb-2"
            >
              {activeDropdown === "businessType"
                ? "Cerrar opciones"
                : "Seleccionar tipo de negocio"}
            </button>

            <div
              className={`absolute mt-2 w-full bg-white border rounded-md shadow-lg p-4 space-y-2 transition-all duration-300 ease-in-out ${
                activeDropdown === "businessType"
                  ? "opacity-100 max-h-[300px] z-50"
                  : "opacity-0 max-h-0 overflow-hidden z-50"
              }`}
            >
              <label className="flex items-center">
                <input
                  type="radio"
                  name="businessType"
                  value="Restaurante"
                  className="mr-2"
                />
                Restaurante
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="businessType"
                  value="Cafetería"
                  className="mr-2"
                />
                Cafetería
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="businessType"
                  value="Food truck"
                  className="mr-2"
                />
                Food truck
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="businessType"
                  value="Bodega"
                  className="mr-2"
                />
                Bodega
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="businessType"
                  value="Otro"
                  className="mr-2"
                />
                Otro
              </label>
            </div>
          </div>

          {/* Dropdown dinámico: ¿Qué te interesa automatizar? */}
          <label className="flex justify-between text-[15px] text-left font-medium text-gray-700 ">
            ¿Qué te interesa automatizar?
            <span className="text-[#E49542] text-sm">(Opcional)</span>
          </label>
          <div className="relative">
            <button
              type="button"
              onClick={() => toggleDropdown("automation")}
              className="w-full bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded-md text-left"
            >
              {activeDropdown === "automation"
                ? "Cerrar opciones"
                : "Seleccionar opciones"}
            </button>

            <div
              className={`absolute mt-2 w-full bg-white border rounded-md shadow-lg p-4 space-y-2 transition-all duration-300 ease-in-out ${
                activeDropdown === "automation"
                  ? "opacity-100 max-h-[300px] z-50"
                  : "opacity-0 max-h-0 overflow-hidden z-50"
              }`}
            >
              <label className="flex items-center">
                <input
                  type="checkbox"
                  value="Toma de pedidos"
                  checked={selectedOptions.includes("Toma de pedidos")}
                  onChange={handleOptionChange}
                  className="mr-2"
                />
                Toma de pedidos
              </label>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  value="Facturación electrónica"
                  checked={selectedOptions.includes("Facturación electrónica")}
                  onChange={handleOptionChange}
                  className="mr-2"
                />
                Facturación electrónica
              </label>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  value="Gestión de caja"
                  checked={selectedOptions.includes("Gestión de caja")}
                  onChange={handleOptionChange}
                  className="mr-2"
                />
                Gestión de caja
              </label>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  value="Delivery"
                  checked={selectedOptions.includes("Delivery")}
                  onChange={handleOptionChange}
                  className="mr-2"
                />
                Delivery
              </label>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  value="Reportes y control"
                  checked={selectedOptions.includes("Reportes y control")}
                  onChange={handleOptionChange}
                  className="mr-2"
                />
                Reportes y control
              </label>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  value="Otro"
                  checked={selectedOptions.includes("Otro")}
                  onChange={handleOptionChange}
                  className="mr-2"
                />
                Otro
              </label>
            </div>
          </div>

          {/* Botones para enviar o cerrar */}
          <div className="mt-4 flex justify-end gap-2">
            <button
              type="submit"
              className="bg-[#E49542] hover:bg-[#854937] text-white px-4 py-2 rounded-md"
            >
              Enviar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Modal;
