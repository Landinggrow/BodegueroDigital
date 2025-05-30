import React, { useState, useEffect } from "react";

const Modal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    businessName: "",
    businessType: "",
  });

  const [selectedOptions, setSelectedOptions] = useState([]);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const toggleDropdown = (dropdown) => {
    setActiveDropdown((prev) => (prev === dropdown ? null : dropdown));
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleRadioChange = (e) => {
    setFormData({
      ...formData,
      businessType: e.target.value,
    });
    setActiveDropdown(null);
  };

  const handleOptionChange = (event) => {
    const value = event.target.value;
    if (event.target.checked) {
      setSelectedOptions((prev) => [...prev, value]);
    } else {
      setSelectedOptions((prev) => prev.filter((option) => option !== value));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(false);
    setError("");

    try {
      const response = await fetch("/contact.json", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          automation: selectedOptions,
        }),
      });

      if (!response.ok) throw new Error("Error al enviar el formulario");

      setSuccess(true);
      setFormData({
        name: "",
        email: "",
        businessName: "",
        businessType: "",
      });
      setSelectedOptions([]);
    } catch (err) {
      setError(err.message || "Ocurrió un error");
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setFormData({
      name: "",
      email: "",
      businessName: "",
      businessType: "",
    });
    setSelectedOptions([]);
    setActiveDropdown(null);
    setSuccess(false);
    setError("");
    onClose();
  };

  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => {
        window.location.href = "https://comercios.andape.pe/systems";
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [success]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-2 sm:px-4">
      <div className="relative bg-white p-4 sm:p-6 rounded-2xl shadow-2xl w-full max-w-lg sm:max-w-md max-h-[95vh] overflow-y-auto transition-all duration-300">
        {/* Botón cerrar */}
        <button
          type="button"
          aria-label="Cerrar modal"
          className="absolute top-3 right-3 bg-gray-100 hover:bg-gray-200 p-2 rounded-full focus:outline-none focus:ring-2 focus:ring-[#7A9EC6] transition"
          onClick={handleClose}
        >
          <svg
            className="w-5 h-5 text-gray-700"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        <h2 className="text-xl sm:text-2xl font-bold mb-4 text-[#092858] text-left">
          Solicita una demostración gratuita
        </h2>

        <form className="space-y-4" onSubmit={handleSubmit}>
          {/* Nombre completo */}
          <label className="block text-[15px] font-medium text-gray-700">
            Nombre completo:
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Ingresa tu nombre"
              className="mt-1 w-full bg-gray-100 focus:bg-white px-4 py-2 rounded-md border border-gray-200 focus:border-[#7A9EC6] outline-none transition"
              required
            />
          </label>

          {/* Correo electrónico */}
          <label className="block text-[15px] font-medium text-gray-700">
            Correo electrónico:
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="ejemplo@gmail.com"
              className="mt-1 w-full bg-gray-100 focus:bg-white px-4 py-2 rounded-md border border-gray-200 focus:border-[#7A9EC6] outline-none transition"
              required
            />
          </label>

          {/* Nombre del comercio */}
          <div>
            <label className="text-[15px] font-medium text-gray-700 flex justify-between">
              <span>Nombre de tu bodega o comercio:</span>
              <span className="text-[#4673A6] text-xs">(Opcional)</span>
            </label>
            <input
              type="text"
              name="businessName"
              value={formData.businessName}
              onChange={handleChange}
              placeholder='"Bodega Central", "Comercial Díaz"'
              className="mt-1 w-full bg-gray-100 focus:bg-white px-4 py-2 rounded-md border border-gray-200 focus:border-[#7A9EC6] outline-none transition"
            />
          </div>

          {/* Tipo de negocio */}
          <div>
            <label className="text-[15px] font-medium text-gray-700 flex justify-between">
              ¿Qué tipo de negocio tienes?
              <span className="text-[#4673A6] text-xs">(Opcional)</span>
            </label>
            <div className="relative mt-1">
              <button
                type="button"
                onClick={() => toggleDropdown("businessType")}
                className="w-full bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-md text-left border border-gray-200 focus:border-[#7A9EC6] outline-none transition"
              >
                {formData.businessType
                  ? formData.businessType
                  : "Seleccionar tipo de negocio"}
              </button>
              <div
                className={`absolute left-0 right-0 mt-2 bg-white border border-gray-200 rounded-md shadow-lg p-3 space-y-2 z-50 transition-all duration-300 ${
                  activeDropdown === "businessType"
                    ? "opacity-100 max-h-60"
                    : "opacity-0 max-h-0 overflow-hidden pointer-events-none"
                }`}
              >
                {[
                  "Bodega",
                  "Tienda de abarrotes",
                  "Minimarket",
                  "Distribuidora",
                  "Otro",
                ].map((option) => (
                  <label
                    key={option}
                    className="flex items-center cursor-pointer text-gray-700"
                  >
                    <input
                      type="radio"
                      name="businessType"
                      value={option}
                      checked={formData.businessType === option}
                      onChange={handleRadioChange}
                      className="mr-2 accent-[#092858]"
                    />
                    {option}
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Qué desea automatizar */}
          <div>
            <label className="flex justify-between text-[15px] font-medium text-gray-700">
              ¿Qué deseas automatizar?
              <span className="text-[#4673A6] text-xs">(Opcional)</span>
            </label>
            <div className="relative mt-1">
              <button
                type="button"
                onClick={() => toggleDropdown("automation")}
                className="w-full bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-md text-left border border-gray-200 focus:border-[#7A9EC6] outline-none transition"
              >
                {selectedOptions.length > 0
                  ? selectedOptions.join(", ")
                  : "Seleccionar opciones"}
              </button>
              <div
                className={`absolute left-0 right-0 mt-2 bg-white border border-gray-200 rounded-md shadow-lg p-3 space-y-2 z-50 transition-all duration-300 ${
                  activeDropdown === "automation"
                    ? "opacity-100 max-h-60"
                    : "opacity-0 max-h-0 overflow-hidden pointer-events-none"
                }`}
              >
                {[
                  "Ventas y POS",
                  "Inventario de productos",
                  "Pedidos a proveedores",
                  "Caja diaria",
                  "Cuentas por cobrar",
                  "Guías de remisión",
                  "Otro",
                ].map((option) => (
                  <label
                    key={option}
                    className="flex items-center cursor-pointer text-gray-700"
                  >
                    <input
                      type="checkbox"
                      value={option}
                      checked={selectedOptions.includes(option)}
                      onChange={handleOptionChange}
                      className="mr-2 accent-[#092858]"
                    />
                    {option}
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Botones */}
          <div className="pt-2 flex justify-end">
            <button
              type="submit"
              className="bg-[#E49542] hover:bg-[#854937] text-white px-6 py-2 rounded-md font-semibold shadow transition"
              disabled={loading}
            >
              {loading ? "Enviando..." : "Enviar"}
            </button>
          </div>

          {/* Mensaje de éxito o error */}
          {success && (
            <p className="mt-4 text-green-600 font-semibold text-center">
              ¡Formulario enviado correctamente! Redirigiendo...
            </p>
          )}
          {error && (
            <p className="mt-4 text-red-600 font-semibold text-center">
              {error}
            </p>
          )}
        </form>
      </div>
    </div>
  );
};

export default Modal;
