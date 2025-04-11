import React, { useState } from "react";
import Button from "./Button"; // Archivo Button.jsx
import Modal from "./Modal"; // Archivo Modal.jsx

const DemoSection = () => {
  const [isModalOpen, setModalOpen] = useState(false); // Estado del modal

  const openModal = () => {
    console.log("Abrir Modal"); // Verifica que este mensaje aparezca en la consola
    setModalOpen(true); // Cambia el estado a "true"
  };

  const closeModal = () => {
    console.log("Cerrar Modal"); // Verifica que este mensaje aparezca en la consola
    setModalOpen(false); // Cambia el estado a "false"
  };

  return (
    <div>
      {/* El botón debe pasar la función openModal */}
      <Button onClick={openModal} />
      {/* El modal debe recibir el estado y la función para cerrarlo */}
      <Modal isOpen={isModalOpen} onClose={closeModal} />
    </div>
  );
};

export default DemoSection;
